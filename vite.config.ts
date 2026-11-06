import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, type Plugin } from 'vite';
import { apiHandler } from './src/server/api.ts';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

function databaseApiPlugin(): Plugin {
  return {
    name: 'markwise-database-api',
    configureServer(server) {
      server.middlewares.use(apiHandler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiHandler);
    },
  };
}

export default defineConfig(() => {
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txhwkaesmhntloiwiuzo.supabase.co'
  ).replace(/^["']|["']$/g, '').trim();

  const supabaseAnonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).replace(/^["']|["']$/g, '').trim();

  const supabasePublishableKey = (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
  ).replace(/^["']|["']$/g, '').trim();

  return {
    plugins: [databaseApiPlugin(), react(), tailwindcss()],
    resolve: {
      alias: [
        {
          find: 'next/image',
          replacement: path.resolve(import.meta.dirname, 'src/lib/next-image.tsx'),
        },
        {
          find: 'next/link',
          replacement: path.resolve(import.meta.dirname, 'src/lib/next-link.tsx'),
        },
        {
          find: 'next/navigation',
          replacement: path.resolve(import.meta.dirname, 'src/lib/next-navigation.ts'),
        },
        {
          find: 'next/headers',
          replacement: path.resolve(import.meta.dirname, 'src/lib/next-headers.ts'),
        },
        {
          find: 'next/cache',
          replacement: path.resolve(import.meta.dirname, 'src/lib/next-cache.ts'),
        },
        {
          find: /^@\/(.*)/,
          replacement: path.resolve(import.meta.dirname, 'src/$1'),
        },
        {
          find: '@',
          replacement: path.resolve(import.meta.dirname, 'src'),
        },
      ],
    },
    define: {
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      'process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(supabasePublishableKey),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    },
    server: {
      // HMR can be configured via DISABLE_HMR env var.
      // File watching is managed to prevent flickering during rapid updates.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
              return 'recharts';
            }
            if (id.includes('node_modules/@supabase')) {
              return 'supabase';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
          },
        },
      },
    },
  };
});
