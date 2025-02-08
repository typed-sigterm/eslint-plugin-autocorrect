import ts from '@typed-sigterm/eslint-config';
import plugin from 'eslint-plugin-eslint-plugin';

export default ts({
  jsonc: true,
  markdown: true,
  stylistic: true,
  toml: true,
  typescript: true,
  vue: true,
}, plugin.configs['flat/recommended'], {
  files: ['playground/**'],
  rules: {
    'no-console': [0],
  },
});
