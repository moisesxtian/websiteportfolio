import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const webhookUrl =
    env.CHAT_WEBHOOK_URL ||
    'https://lid-bunny-cathouse.ngrok-free.dev/webhook/portfolio/chat'
  const webhook = new URL(webhookUrl)
  const user = env.CHAT_WEBHOOK_USER || 'chan'
  const password = env.CHAT_WEBHOOK_PASSWORD || 'donthackmepls'
  const basicAuth = Buffer.from(`${user}:${password}`).toString('base64')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: webhook.origin,
          changeOrigin: true,
          secure: true,
          rewrite: () => webhook.pathname,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Basic ${basicAuth}`)
              proxyReq.setHeader('ngrok-skip-browser-warning', '69420')
            })
          },
        },
      },
    },
  }
})
