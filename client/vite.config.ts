import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
    rewrite: [
      { from: /^\/login$/, to: "/index.html" },
      { from: /^\/dashboard$/, to: "/index.html" },
      { from: /^$/, to: "/index.html" }, // Handle the root path
    ],
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
