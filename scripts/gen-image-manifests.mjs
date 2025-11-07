import { readdir, writeFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const imagesDir = join(process.cwd(), 'public', 'images')
const imageExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']

// Product folders that need manifests
const productFolders = ['biodisc', 'bioficient', 'bioair', 'biotec', 'rainstore', 'psd1', 'hero']

async function generateManifest(folder) {
  const folderPath = join(imagesDir, folder)
  try {
    const files = await readdir(folderPath)
    const imageFiles = files
      .filter(f => imageExts.includes(extname(f).toLowerCase()))
      .filter(f => f !== 'manifest.json') // Exclude manifest.json itself
      .sort() // Sort alphabetically for consistent ordering
    
    const manifestPath = join(folderPath, 'manifest.json')
    await writeFile(manifestPath, JSON.stringify(imageFiles, null, 2) + '\n')
    console.log(`✓ ${folder}: ${imageFiles.length} image(s) -> manifest.json`)
    return imageFiles.length
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`⚠ ${folder}: folder does not exist`)
    } else {
      console.error(`✗ ${folder}: ${err.message}`)
    }
    return 0
  }
}

console.log('Generating image manifests...\n')
const counts = await Promise.all(productFolders.map(generateManifest))
const total = counts.reduce((a, b) => a + b, 0)
console.log(`\nDone! Found ${total} image(s) across ${productFolders.length} folder(s).`)

