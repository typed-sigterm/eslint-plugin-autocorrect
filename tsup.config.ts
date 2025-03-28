import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  format: 'esm',
  clean: true,
  splitting: false,
  sourcemap: true,
  dts: {
    resolve: true,
  },
});
