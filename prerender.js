import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Routes matching App.tsx for static prerender
const routesToPrerender = [
  '/',
  '/products',
  '/cartons',
  '/packages',
  '/sales',
  '/permit-guide',
  '/suratlantikanagent',
  '/safety-guide',
  '/testimonials',
  '/contact',
  '/cart'
];

// Function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log('Created directory:', dir)
  }
}

;(async () => {
  for (const url of routesToPrerender) {
    const appHtml = render(url);
    const html = template.replace('<!--app-html-->', appHtml)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    const absoluteFilePath = toAbsolute(filePath)
    
    // Ensure directory exists before writing file
    ensureDirectoryExists(absoluteFilePath)
    
    fs.writeFileSync(absoluteFilePath, html)
    console.log('pre-rendered:', filePath)
  }
})()
