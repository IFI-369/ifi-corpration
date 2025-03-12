import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // Automatically handles path aliases from tsconfig
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // This will automatically use the paths defined in tsconfig.json
  ],
  base: "/", // Define the base URL for the application
  resolve: {
    alias: {
      // Remove this since vite-tsconfig-paths already handles it
      // "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Output directory for production build
    assetsDir: "assets", // Directory for assets
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]", // Unique file names for assets
        entryFileNames: "assets/[name]-[hash].js", // Unique entry point names
      },
    },
  },
});
