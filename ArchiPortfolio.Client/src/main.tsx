import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- BU SATIR VAR MI?
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- BU SARMALAMA YAPILMIŞ MI? */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)