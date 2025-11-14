import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// Base URL - update this when deploying to production
const BASE_URL = process.env.SITE_URL || 'https://www.kingspan-eesti-bio.ee'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ee" href="${BASE_URL}/?lang=ee"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?lang=en"/>
  </url>

  <!-- Product Sections -->
  <url>
    <loc>${BASE_URL}/#biodisc</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#bioficient</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#bioair</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#biotec</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#rainstore</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${BASE_URL}/#psd1</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Downloads Section -->
  <url>
    <loc>${BASE_URL}/#downloads</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact Section -->
  <url>
    <loc>${BASE_URL}/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Privacy Policy -->
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="ee" href="${BASE_URL}/privacy?lang=ee"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/privacy?lang=en"/>
  </url>

</urlset>
`

const outFile = join(process.cwd(), 'public', 'sitemap.xml')
await writeFile(outFile, sitemap, 'utf-8')
console.log(`✓ Generated sitemap.xml with base URL: ${BASE_URL}`)

