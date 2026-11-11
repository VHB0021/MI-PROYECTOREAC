import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Actions define GITHUB_REPOSITORY con el formato usuario/repositorio.
// Asi la pagina funciona aunque el repositorio no se llame como la carpeta local.
const [usuario, repositorio] = (process.env.GITHUB_REPOSITORY || '').split('/')
const base = repositorio
  ? repositorio === `${usuario}.github.io` ? '/' : `/${repositorio}/`
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
