import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { api } from './lib/axios'
import './index.css'

const queryClient = new QueryClient()

// Mock aktif kecuali VITE_USE_MOCK=false (saat backend sudah ada)
async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK === 'false') return
  const { setupMock } = await import('./mocks/setupMock')
  setupMock(api)
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  )
})
