import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    // Mantido desativado para evitar dependência do binário nativo do lightningcss
    // em ambientes onde ele não está disponível.
    cssMinify: false,
  },
});
