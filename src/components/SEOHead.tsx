import { useEffect } from 'react'

const BASE_URL = 'https://kingspaneesti.com'

function updateCanonicalTags() {
  // Get current path without query params and hash
  const path = window.location.pathname
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  const canonicalUrl = `${BASE_URL}${cleanPath || '/'}`
  
  // Remove existing canonical tag if any
  const existingCanonical = document.querySelector('link[rel="canonical"]')
  if (existingCanonical) {
    existingCanonical.remove()
  }
  
  // Remove existing hreflang tags
  const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]')
  existingHreflangs.forEach(tag => tag.remove())
  
  // Add canonical tag
  const canonicalLink = document.createElement('link')
  canonicalLink.rel = 'canonical'
  canonicalLink.href = canonicalUrl
  document.head.appendChild(canonicalLink)
  
  // Add hreflang tags for language variants (Estonian and English)
  // Both point to the same URL since language is handled client-side
  const hreflangEe = document.createElement('link')
  hreflangEe.rel = 'alternate'
  hreflangEe.hreflang = 'et' // Estonian language code (ISO 639-1)
  hreflangEe.href = canonicalUrl
  document.head.appendChild(hreflangEe)
  
  const hreflangEn = document.createElement('link')
  hreflangEn.rel = 'alternate'
  hreflangEn.hreflang = 'en'
  hreflangEn.href = canonicalUrl
  document.head.appendChild(hreflangEn)
  
  // Add x-default hreflang (points to the default/preferred version)
  const hreflangDefault = document.createElement('link')
  hreflangDefault.rel = 'alternate'
  hreflangDefault.hreflang = 'x-default'
  hreflangDefault.href = canonicalUrl
  document.head.appendChild(hreflangDefault)
  
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

