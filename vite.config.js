import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import process from "process"; // Import process for polyfill

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      process: "process/browser", // Polyfill process for the browser
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  define: {
    "process.env": process.env, // Polyfill process.env for browser usage
  },
});
