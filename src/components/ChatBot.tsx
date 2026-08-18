import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Send, X } from 'lucide-react';
import { useChatBot, wakeChatSession, type ChatMessage } from '../Hooks/useChatBot';
import { PROFILE_AVATAR } from '../data/profile';
import { useChatProfile } from '../Hooks/useChatProfile';
import ChatProfile from './ChatProfile';

function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <img
        src={PROFILE_AVATAR}
        alt=""
        className="h-7 w-7 rounded-full object-cover object-top"
      />
      <div className="rounded-2xl rounded-bl-md bg-surface-muted px-3.5 py-2.5 dark:bg-neutral-800">
        <p className="sr-only">Chan is typing</p>
        <div className="flex h-4 items-center gap-1 text-gray-500 dark:text-gray-400" aria-hidden="true">
          <span className="chat-dot chat-dot-1" />
          <span className="chat-dot chat-dot-2" />
          <span className="chat-dot chat-dot-3" />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-main-color px-3.5 py-2 text-sm leading-relaxed text-white">
          {message.text}
        </p>
      </div>
    );
  }

  if (message.role === 'error') {
    return (
      <div className="flex justify-center">
        <p className="max-w-[90%] rounded-xl bg-red-50 px-3 py-2 text-center text-xs leading-relaxed text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <img
        src={PROFILE_AVATAR}
        alt=""
        className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top"
      />
      <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface-muted px-3.5 py-2 text-sm leading-relaxed text-secondary-color dark:bg-neutral-800">
        {message.text}
      </p>
    </div>
  );
}

export default function ChatBot() {
  const { messages, isLoading, sendMessage } = useChatBot();
  useChatProfile();
  const wokeRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, open, profileOpen]);

  useEffect(() => {
    if (!open || profileOpen) return;
    inputRef.current?.focus();
  }, [open, profileOpen]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (profileOpen) {
        setProfileOpen(false);
        return;
      }
      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, profileOpen]);

  const closeChat = () => {
    setProfileOpen(false);
    setOpen(false);
  };

  const toggleChat = () => {
    setOpen((current) => {
      if (current) {
        setProfileOpen(false);
        return false;
      }

      if (!wokeRef.current) {
        wokeRef.current = true;
        void wakeChatSession();
      }

      return true;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isLoading) return;
    setDraft('');
    void sendMessage(text);
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[60] flex flex-col items-end overflow-visible font-poppins sm:bottom-6 sm:right-6">
      {open ? (
        <section
          className="chat-panel pointer-events-auto mb-3 flex w-[min(calc(100vw-2.5rem),24rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-neutral-800/15 dark:bg-surface dark:shadow-black/40"
          style={{ height: 'min(32rem, calc(100svh - 7.5rem))' }}
          aria-label={profileOpen ? 'About Chan' : 'Chat with Chan'}
        >
          {profileOpen ? (
            <ChatProfile onBack={() => setProfileOpen(false)} />
          ) : (
            <>
          <header className="flex items-center gap-3 px-3 py-3">
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              className="relative flex-shrink-0 rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color"
              aria-label="Open profile"
            >
              <img
                src={PROFILE_AVATAR}
                alt=""
                className="h-10 w-10 rounded-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-neutral-800" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-secondary-color">Chan</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {isLoading ? 'Chan is typing...' : 'Ask me anything'}
              </p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-black/5 hover:text-secondary-color dark:hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto scroll-smooth scrollbar-hide px-3 py-3"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading ? <TypingDots /> : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3"
          >
            <div className="flex items-center gap-2 rounded-full bg-surface-muted px-2 py-1 focus-within:ring-1 focus-within:ring-main-color/40 dark:bg-neutral-800">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-secondary-color outline-none placeholder:text-gray-400 disabled:opacity-60"
                autoComplete="off"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={isLoading || !draft.trim()}
                className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-main-color text-white transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
            </>
          )}
        </section>
      ) : null}

      <button
        type="button"
        onClick={toggleChat}
        className={
          open
            ? 'pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-neutral-700 text-white shadow-lg shadow-neutral-800/20 ring-1 ring-black/5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color dark:bg-neutral-600 dark:ring-white/10'
            : 'chat-fab pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color'
        }
        aria-label={open ? 'Close chat' : 'Chat me'}
        aria-expanded={open}
      >
        {open ? (
          <X size={14} />
        ) : (
          <>
            <span className="chat-fab-label">Chat me</span>
            <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center">
              <span className="chat-fab-pulse" aria-hidden="true" />
              <span className="chat-fab-photo bg-gray-100 shadow-lg shadow-neutral-800/20 ring-1 ring-black/5 dark:bg-neutral-700 dark:ring-white/10">
                <img src={PROFILE_AVATAR} alt="" />
              </span>
              <span className="absolute bottom-0 right-0 z-10 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-neutral-900" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
