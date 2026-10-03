import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    port: 5173,
    watch: {
      ignored: ["**/public/assets/**", "**/.github/**"],
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three") || id.includes("maath")) {
              return "vendor-three";
            }
            if (id.includes("framer-motion") || id.includes("motion")) {
              return "vendor-motion";
            }
            if (id.includes("gsap") || id.includes("@gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "vendor-icons";
            }
            if (id.includes("react-router-dom") || id.includes("react-helmet-async")) {
              return "vendor-routing";
            }
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react-core";
            }
          }
        },
      },
    },
  },
});