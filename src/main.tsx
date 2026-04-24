import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from '@/lib/router'
import { LanguageProvider } from '@/lib/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LanguageProvider>
  </StrictMode>,
)
