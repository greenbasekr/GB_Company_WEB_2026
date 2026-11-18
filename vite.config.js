import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { newsPosts } from './src/data/news.js'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/GB_Company_WEB_2026/' : '/',
  build: { outDir: 'docs' },
  plugins: [react(), {
    name: 'github-pages-route-files',
    apply: 'build',
    async closeBundle() {
      const output = resolve('docs')
      const html = await readFile(resolve(output, 'index.html'), 'utf8')
      // Pages has no SPA fallback: give each public route its own index.html.
      const routes = ['companyInfo', 'service', 'project', 'news',
        ...['powerbank', 'battery-diagnosis', 'result-1', 'result-2'].map(id => `project/${id}`),
        ...newsPosts.map(post => `news/${post.id}`)]
      for (const route of routes) {
        const directory = resolve(output, route)
        await mkdir(directory, { recursive: true })
        await writeFile(resolve(directory, 'index.html'), html)
      }
      await writeFile(resolve(output, '.nojekyll'), '')
      await writeFile(resolve(output, '404.html'), html)
    },
  }],
}))
