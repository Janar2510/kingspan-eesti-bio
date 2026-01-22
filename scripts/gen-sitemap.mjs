import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Base URL - update this when deploying to production
const BASE_URL = process.env.SITE_URL || 'https://kingspaneesti.com'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="et" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>${BASE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="et" href="${BASE_URL}/about"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/about"/>
  </url>
  
  <!-- Privacy Policy -->
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="et" href="${BASE_URL}/privacy"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/privacy"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/privacy"/>
  </url>
  
  <!-- Calculator -->
  <url>
    <loc>${BASE_URL}/calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="et" href="${BASE_URL}/calculator"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/calculator"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/calculator"/>
  </url>

</urlset>
`

const outFile = join(process.cwd(), 'public', 'sitemap.xml')
await writeFile(outFile, sitemap, 'utf-8')
console.log(`✓ Generated sitemap.xml with base URL: ${BASE_URL}`)

