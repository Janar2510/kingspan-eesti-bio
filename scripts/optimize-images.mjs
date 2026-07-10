import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

// Generates a correctly-sized `.opt.webp` next to each full-resolution
// product photo. Gallery.tsx's fullWidth mode prefers full-res .png/.jpg
// over the pre-existing .webp files in this repo because those are ~800px
// downsized derivatives that blur badly at full-card-width. This script
// produces a webp at the SOURCE's native resolution (no upscale, no
// downscale below ~1400px) so we get the file-size win without the blur.

const imagesDir = join(process.cwd(), 'public', 'images')
const productFolders = ['biodisc', 'bioficient', 'bioair', 'biotec', 'rainstore', 'psd1']
const rasterExts = ['.png', '.jpg', '.jpeg']
const MIN_WIDTH = 1400
const QUALITY = 80

async function optimizeFolder(folder) {
  const folderPath = join(imagesDir, folder)
  let files
  try {
    files = await readdir(folderPath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`⚠ ${folder}: folder does not exist`)
      return 0
    }
    throw err
  }

  const candidates = files.filter(
    (f) => rasterExts.includes(extname(f).toLowerCase()) && !/logo/i.test(f)
  )

  let count = 0
  for (const file of candidates) {
    const srcPath = join(folderPath, file)
    const outName = `${basename(file, extname(file))}.opt.webp`
    const outPath = join(folderPath, outName)

    const srcStat = await stat(srcPath)
    const img = sharp(srcPath)
    const meta = await img.metadata()
    const targetWidth = Math.max(MIN_WIDTH, meta.width ?? MIN_WIDTH)
    const resizeWidth = Math.min(targetWidth, meta.width ?? targetWidth)

    await img
      .resize({ width: resizeWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const outStat = await stat(outPath)
    const savedPct = Math.round((1 - outStat.size / srcStat.size) * 100)
    console.log(
      `✓ ${folder}/${outName} — ${(srcStat.size / 1024 / 1024).toFixed(2)}MB → ${(outStat.size / 1024).toFixed(0)}KB (${savedPct}% smaller)`
    )
    count++
  }
  return count
}

console.log('Optimizing product images (native resolution, webp)...\n')
let total = 0
for (const folder of productFolders) {
  total += await optimizeFolder(folder)
}
console.log(`\nDone! Optimized ${total} image(s). Re-run \`npm run gen:images\` to update manifests.`)
