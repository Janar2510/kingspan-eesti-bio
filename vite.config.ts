import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    // Avoid IPv6 ::1 bind issues on some setups
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
})