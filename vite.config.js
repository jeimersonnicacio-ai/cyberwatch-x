import process from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages hosts this project under /cyberwatch-x/ (not the domain root).
// Local development keeps a relative base so it also works from npm run dev/preview.
const base = process.env.GITHUB_PAGES === "true" ? "/cyberwatch-x/" : "./";

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    // Mantido desativado para evitar dependência do binário nativo do lightningcss
    // em ambientes onde ele não está disponível.
    cssMinify: false,
  },
});
