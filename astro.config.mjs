import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://julianr10.github.io',
  base: '/alma-dendera/',
  server: { open: '/alma-dendera/' },
});
