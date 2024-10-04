import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    eslint({
      exclude: ['node_modules/**', 'dist/**', 'public/**', 'registerSW.js', 'sw.js'],
    }),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates service worker
      injectRegister: 'auto', // Automatically injects the service worker registration script
      devOptions: {
        enabled: true, // Enable service worker in development mode
      },
      manifest: {
        name: 'SnapShop',
        short_name: 'SnapShop',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        description: 'E-commerce app where you can buy almost everything!',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          // Cache HTML documents
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst', // Tries network first, falls back to cache if offline
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 5, // Fallback to cache if no network response within 5 seconds
              expiration: {
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
            },
          },
          // Cache JS and CSS files
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate', // Serve from cache, update in background
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxEntries: 100, // Max 100 assets in the cache
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          // Cache images
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Serve images from cache first, update later
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50, // Cache up to 50 images
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
              },
            },
          },
          // Cache API responses
          {
            urlPattern: new RegExp(`${import.meta.env.VITE_API_BASE_URL}/.*`),  // Adjust this to match your API domain
            handler: 'NetworkFirst', // Try network first, fallback to cache
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50, // Cache up to 50 API responses
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache opaque responses and successful responses
              },
            },
          },
        ],
        // Fallback page when offline and the page is not cached
        navigateFallback: '/offline.html',
      },
    }),
  ],
});
