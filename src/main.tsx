import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App'
import './utils/i18n'
import PrivacyPolicy from './pages/PrivacyPolicy'

const isPrivacyRoute = window.location.pathname.startsWith('/privacy')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isPrivacyRoute ? <PrivacyPolicy /> : <App />}
  </React.StrictMode>,
)
