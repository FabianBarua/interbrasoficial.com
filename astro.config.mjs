import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import { seedDatabase } from "./db/seed";

// https://astro.build/config
export default defineConfig({
  site: "https://interbrasoficial.com/",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "pt"],
    prefixDefaultLocale: true
  },
  integrations: [tailwind(), react(), seedDatabase(), sitemap({
    i18n: {
      defaultLocale: "es",
      locales: {
        es: 'es-ES',
        pt: 'pt-BR'
      }
    }
  })]
}); 