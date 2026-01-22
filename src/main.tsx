import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App'
import './utils/i18n'
import PrivacyPolicy from './pages/PrivacyPolicy'
import About from './pages/About'
import Calculator from './pages/Calculator'

const path = window.location.pathname
let Component = App

if (path.startsWith('/privacy')) {
  Component = PrivacyPolicy
} else if (path.startsWith('/about')) {
  Component = About
} else if (path.startsWith('/calculator') || path.startsWith('/kalkulaator')) {
  Component = Calculator
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
)
