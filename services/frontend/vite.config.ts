import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    // https://github.com/vitejs/vite/discussions/8726
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
  });
};
