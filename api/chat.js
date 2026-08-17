export const config = {
  maxDuration: 60,
};

const WEBHOOK_URL =
  process.env.CHAT_WEBHOOK_URL ||
  'https://lid-bunny-cathouse.ngrok-free.dev/webhook/portfolio/chat';
const WEBHOOK_USER = process.env.CHAT_WEBHOOK_USER || 'chan';
const WEBHOOK_PASSWORD = process.env.CHAT_WEBHOOK_PASSWORD || 'donthackmepls';

function readBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = await readBody(req);
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  const action = body.action === 'loadPreviousSession' ? 'loadPreviousSession' : 'sendMessage';

  if (action === 'sendMessage' && !message) {
    res.status(400).json({ error: 'Please type a message first.' });
    return;
  }

  const auth = Buffer.from(`${WEBHOOK_USER}:${WEBHOOK_PASSWORD}`).toString('base64');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        message,
        chatInput: message,
        sessionId,
        action,
      }),
      signal: controller.signal,
    });

    const rawText = await upstream.text();
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { reply: rawText };
    }

    if (upstream.status === 403) {
      res.status(403).json({
        error: 'Sorry, I cannot respond to that.',
      });
      return;
    }

    if (!upstream.ok) {
      res.status(502).json({
        error: "Sorry, I'm having trouble connecting right now. Please try again.",
      });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    const timedOut = error && error.name === 'AbortError';
    res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? 'Sorry, that took too long. Please try again.'
        : "Sorry, I'm having trouble connecting right now. Please try again.",
    });
  } finally {
    clearTimeout(timer);
  }
}
