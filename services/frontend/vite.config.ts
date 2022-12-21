import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      preact(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number.parseInt(process.env.VITE_PORT),
    },
    base: process.env.VITE_BASE_URL,
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    optimizeDeps: {
      include: ['@codern/external', '@codern/internal', '@codern/shared'],
    },
    build: {
      commonjsOptions: {
        include: [/external/, /internal/, /shared/, /node_modules/]
      },
    },
  });
};
