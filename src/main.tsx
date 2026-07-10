import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './App'
import './utils/i18n'

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const About = lazy(() => import('./pages/About'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Hajaasustus = lazy(() => import('./pages/Hajaasustus'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

const path = window.location.pathname
let Component: React.ComponentType = App

if (path.startsWith('/privacy')) {
  Component = PrivacyPolicy
} else if (path.startsWith('/about')) {
  Component = About
} else if (path.startsWith('/calculator') || path.startsWith('/kalkulaator')) {
  Component = Calculator
} else if (path.startsWith('/hajaasustuse-programm') || path.startsWith('/hajaasustus')) {
  Component = Hajaasustus
} else if (path.match(/^\/blog\/[^/]+/)) {
  Component = BlogPost
} else if (path.startsWith('/blog')) {
  Component = Blog
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  </React.StrictMode>,
)
