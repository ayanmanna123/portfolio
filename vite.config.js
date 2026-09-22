import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/leetcode-proxy": {
        target: "https://leetcode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/leetcode-proxy/, ""),
        secure: false,
        headers: {
          Referer: "https://leetcode.com",
          Origin: "https://leetcode.com",
        },
      },
    },
  },
});
