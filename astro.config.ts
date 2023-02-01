import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import serviceWorker from 'astrojs-service-worker';

export default defineConfig({
  integrations: [react(), serviceWorker()],
});
