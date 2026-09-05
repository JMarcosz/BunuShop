// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://bunushop.store',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind({ applyBaseStyles: false })],
  security: {
    checkOrigin: false,
  },
});

