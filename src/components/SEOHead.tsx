import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://biopuhastid.com'

function getPageMeta(path: string, t: (key: string) => string) {
  if (path.startsWith('/about')) {
    return {
      title: t('meta.about.title'),
      description: t('meta.about.description'),
      image: `${BASE_URL}/About%20section/About%20page%202.jpg`,
    }
  }
  if (path.startsWith('/privacy')) {
    return {
      title: t('meta.privacy.title'),
      description: t('meta.privacy.description'),
      image: `${BASE_URL}/images/hero/hero-biological.png`,
    }
  }
  if (path.startsWith('/calculator') || path.startsWith('/kalkulaator')) {
    return {
      title: t('meta.calculator.title'),
      description: t('meta.calculator.description'),
      image: `${BASE_URL}/images/hero/hero-biological.png`,
    }
  }
  return {
    title: t('meta.home.title'),
    description: t('meta.home.description'),
    image: `${BASE_URL}/images/hero/hero-biological.png`,
  }
}

function upsertMetaTag(selector: string, attributes: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'content') return
      el!.setAttribute(key, value)
    })
    document.head.appendChild(el)
  }
  if (attributes.content) el.setAttribute('content', attributes.content)
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

function updateCanonicalTags(t: (key: string) => string) {
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

  const { title, description, image } = getPageMeta(path, t)
  document.title = title
  upsertMetaTag('meta[name="description"]', { name: 'description', content: description })
  upsertMetaTag('meta[name="robots"]', { name: 'robots', content: 'index,follow' })

  upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: title })
  upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Kingspan Biopuhastid' })
  upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: image })

  upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image })

  const services = [
    { name: 'BioDisc', description: t('products.biodisc_desc') },
    { name: 'BioFicient', description: t('products.bioficient_desc') },
    { name: 'BioAir', description: t('products.bioair_desc') },
    { name: 'BioTec Flo', description: t('products.biotec_desc') },
    { name: 'RainStore', description: t('products.rainstore_desc') },
    { name: 'PSD1', description: t('products.psd1_desc') },
  ]

  upsertJsonLd('ld-services', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'Kingspan Biopuhastid',
          url: BASE_URL,
        },
        areaServed: 'Estonia',
      },
    })),
  })

  upsertJsonLd('ld-local-business', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Kingspan Biopuhastid',
    url: BASE_URL,
    image: image,
    email: 'info@kingspaneesti.com',
    telephone: '+372 5610 3001',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Päikese VKT 6',
      addressLocality: 'Viljandi vald',
      postalCode: '70401',
      addressCountry: 'EE',
    },
    areaServed: [
      { '@type': 'Country', name: 'Estonia' },
      { '@type': 'Country', name: 'Latvia' },
    ],
  })
}

export default function SEOHead() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // Update on mount
    updateCanonicalTags(t)
    
    // Listen for popstate events (back/forward navigation)
    const onPopState = () => updateCanonicalTags(t)
    window.addEventListener('popstate', onPopState)
    
    // Also update when pathname changes (for SPA navigation)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      updateCanonicalTags(t)
    }
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      updateCanonicalTags(t)
    }
    
    return () => {
      window.removeEventListener('popstate', onPopState)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [i18n.language])
  
  return null
}

