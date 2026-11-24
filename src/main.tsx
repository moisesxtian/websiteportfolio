import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import './index.css'
import App from './App.tsx'
import { runWhenIdle } from './lib/idle'
import { isLiteMode } from './lib/perf'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Tags <html> with .perf-lite on software rendering so CSS can drop its
// remaining decorative motion. Runs after first paint so it never delays it.
runWhenIdle(() => {
  isLiteMode()
})
