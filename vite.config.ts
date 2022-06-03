import windicss from 'vite-plugin-windicss';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), windicss()],
  resolve: {
    alias: {
      '@assets': resolve('src/assets'),
      '@assets/*': resolve('src/assets/*'),
      '@components': resolve('src/components'),
      '@components/*': resolve('src/components/*'),
    },
  },
});
