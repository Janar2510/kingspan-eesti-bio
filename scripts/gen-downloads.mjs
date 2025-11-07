import { readdir, writeFile, stat, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const downloadsDir = join(process.cwd(), 'public', 'downloads')
const outFile = join(process.cwd(), 'src', 'data', 'downloads.json')

function titleFrom(filename) {
  const name = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ')
  return name.replace(/\b([a-z])/g, (m)=>m.toUpperCase())
}

function guessLang(filename) {
  const f = filename.toLowerCase()
  if (f.includes('_ee') || f.includes('(est)') || f.includes('est')) return 'EE'
  if (f.includes('_en') || f.includes('(en)') || f.includes('eng')) return 'EN'
  return 'EN'
}

await mkdir(downloadsDir, { recursive: true })

const files = (await readdir(downloadsDir)).filter(f => ['.pdf', '.doc', '.docx'].includes(extname(f).toLowerCase()))
const list = await Promise.all(files.map(async file => {
  const s = await stat(join(downloadsDir, file))
  const sizeKB = Math.max(1, Math.round(s.size/1024))
  return {
    title: titleFrom(file),
    file,
    lang: guessLang(file),
    sizeKB
  }
}))

await writeFile(outFile, JSON.stringify(list, null, 2))
console.log(`Wrote ${outFile} with ${list.length} items.`)
