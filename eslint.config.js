import ts from '@typed-sigterm/eslint-config';
import plugin from 'eslint-plugin-eslint-plugin';
import autocorrect from './dist/index.js';

export default ts({
  plugins: {
    autocorrect,
  },
  rules: {
    'autocorrect/issue': [2],
  },
}, plugin.configs['flat/recommended']);
