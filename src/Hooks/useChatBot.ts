import { useCallback, useState } from 'react';

export type ChatRole = 'user' | 'bot' | 'error';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const CHAT_TIMEOUT_MS = 20000;

const WELCOME_TEXT =
  "Hi, I'm Chan. Ask me about my work, skills, or anything you see on this site.";

const CONNECT_ERROR =
  "Sorry, I'm having trouble connecting right now. Please try again.";

const FORBIDDEN_REPLY = 'Sorry, I cannot respond to that.';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getSessionId() {
  const key = 'portfolio-chat-session';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID();
  sessionStorage.setItem(key, id);
  return id;
}

/** Wakes the chat webhook so the first real message is not waiting on a cold start */
export function wakeChatSession() {
  return fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'loadPreviousSession',
      sessionId: getSessionId(),
    }),
  }).catch(() => undefined);
}

/** n8n and our API can return the reply under a few different keys */
function pickReply(data: unknown): string {
  if (typeof data === 'string') return data.trim();
  if (!data || typeof data !== 'object') return '';

  const record = data as Record<string, unknown>;
  const keys = ['reply', 'output', 'text', 'response', 'answer', 'message'];

  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  if (Array.isArray(data) && data.length > 0) {
    return pickReply(data[0]);
  }

  return '';
}

export function useChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'bot', text: WELCOME_TEXT },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatInput: text,
          sessionId: getSessionId(),
          action: 'sendMessage',
        }),
        signal: controller.signal,
      });

      const raw = await res.text();
      let data: unknown = {};
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }
      }

      if (res.status === 403) {
        setMessages((current) => [
          ...current,
          { id: createId(), role: 'bot', text: FORBIDDEN_REPLY },
        ]);
        return;
      }

      if (!res.ok) {
        const fromApi =
          data &&
          typeof data === 'object' &&
          typeof (data as { error?: unknown }).error === 'string'
            ? (data as { error: string }).error
            : CONNECT_ERROR;

        setMessages((current) => [
          ...current,
          { id: createId(), role: 'error', text: fromApi },
        ]);
        return;
      }

      const reply = pickReply(data);
      if (!reply) {
        setMessages((current) => [
          ...current,
          {
            id: createId(),
            role: 'error',
            text: 'I received an empty reply. Please try again.',
          },
        ]);
        return;
      }

      setMessages((current) => [
        ...current,
        { id: createId(), role: 'bot', text: reply },
      ]);
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === 'AbortError';
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'error',
          text: timedOut
            ? 'Sorry, that took too long. Please try again.'
            : CONNECT_ERROR,
        },
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [isLoading]);

  return { messages, isLoading, sendMessage };
}
