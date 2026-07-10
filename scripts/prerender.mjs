#!/usr/bin/env node
/**
 * prerender — snapshot each route to static HTML after `vite build`, so
 * non-JS crawlers (and AI engines) get real content. SPA stays the same;
 * React hydrates over the snapshot on load.
 *
 * One-time setup:  npm i -D puppeteer
 * Run:            npm run build:static   (build → prerender)
 *
 * Reads dist/, serves it with an SPA fallback, visits each ROUTE, and
 * writes dist/<route>/index.html.
 */
import { createServer } from 'http'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, extname, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(root, 'dist')
const ROUTES = ['/', '/about', '/privacy', '/calculator', '/hajaasustuse-programm']
const PORT = 5099

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain',
}

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.')
  process.exit(1)
}

let puppeteer
try {
  puppeteer = (await import('puppeteer')).default
} catch {
  console.error('Puppeteer not installed. Run:  npm i -D puppeteer')
  process.exit(1)
}

// Static server with SPA fallback to index.html
const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
    let filePath = join(DIST, urlPath)
    if (urlPath === '/' || !extname(urlPath)) filePath = join(DIST, 'index.html')
    if (!existsSync(filePath)) filePath = join(DIST, 'index.html')
    const body = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(500); res.end('err')
  }
})

await new Promise((r) => server.listen(PORT, r))
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

for (const route of ROUTES) {
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
  await page.waitForFunction(() => document.querySelector('#root')?.children.length > 0, { timeout: 15000 }).catch(() => {})

  // Scroll through the full page so framer-motion whileInView reveals fire,
  // then let timer-based fades (hero FadeIn/AnimatedHeading) finish settling.
  await page.evaluate(async () => {
    const step = window.innerHeight
    const height = document.body.scrollHeight
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 150))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 2500))

  const html = await page.content()
  const outDir = route === '/' ? DIST : join(DIST, route)
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, 'index.html'), html, 'utf8')
  console.log(`✓ prerendered ${route}`)
  await page.close()
}

await browser.close()
server.close()
console.log('✓ prerender complete')
