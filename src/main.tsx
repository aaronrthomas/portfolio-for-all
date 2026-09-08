import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Easter egg — console message for curious developers
console.log(
  '%c\n' +
  '  ╔═══════════════════════════════════════╗\n' +
  '  ║   AARON R THOMAS — Portfolio          ║\n' +
  '  ║   Designer × Developer × Creator      ║\n' +
  '  ║                                       ║\n' +
  '  ║   👋 Hey curious dev.                 ║\n' +
  '  ║   You found this. Nice.               ║\n' +
  '  ║                                       ║\n' +
  '  ║   Built with React + Framer Motion    ║\n' +
  '  ║   Designed with intention.            ║\n' +
  '  ╚═══════════════════════════════════════╝\n',
  'color: #1DBF73; font-family: monospace; font-size: 12px;'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
