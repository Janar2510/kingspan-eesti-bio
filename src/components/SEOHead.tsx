import { useEffect } from 'react'

const BASE_URL = 'https://kingspaneesti.com'

function updateCanonicalTags() {
  // Get current path without query params and hash
  const path = window.location.pathname
  // Remove trailing slash except for root
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  const canonicalUrl = `${BASE_URL}${cleanPath || '/'}`
  
  // Update or create canonical tag (server-side script may have already created it)
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.href = canonicalUrl
  
  // Update hreflang tags (server-side script may have already created them)
  const hreflangTags = ['et', 'en', 'x-default']
  hreflangTags.forEach(lang => {
    let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement
    if (!hreflangLink) {
      hreflangLink = document.createElement('link')
      hreflangLink.rel = 'alternate'
      hreflangLink.hreflang = lang
      document.head.appendChild(hreflangLink)
    }
    hreflangLink.hreflang = lang
    hreflangLink.href = canonicalUrl
  })
  
  // Update og:url if exists, or add it
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (!ogUrl) {
    ogUrl = document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    document.head.appendChild(ogUrl)
  }
  ogUrl.setAttribute('content', canonicalUrl)
}

export default function SEOHead() {
  useEffect(() => {
    // Update on mount
    updateCanonicalTags()
    
    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', updateCanonicalTags)
    
    // Also update when pathname changes (for SPA navigation)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      updateCanonicalTags()
    }
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      updateCanonicalTags()
    }
    
    return () => {
      window.removeEventListener('popstate', updateCanonicalTags)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])
  
  return null
}

