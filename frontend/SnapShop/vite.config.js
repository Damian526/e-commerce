import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the configuration
export default defineConfig({
  plugins: [
    react(),
    eslint({
      // Exclude service worker files and other generated files
      exclude: [
        "node_modules/**",
        "dist/**",
        "public/**",
        "registerSW.js",
        "sw.js",
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      // Remove filename option or place it under appropriate configuration
      // Remove strategies if using default 'generateSW'
      manifest: {
        name: "SnapShop",
        short_name: "SnapShop",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        description: "E-commerce app where you can buy almost everything!",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
