import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8080,
  },
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@modules' : path.resolve(__dirname, './src/modules'),
      '@components' : path.resolve(__dirname, './src/components'),
      '@ui' : path.resolve(__dirname, './src/ui'),
    },
  },
  plugins: [react()],
})
