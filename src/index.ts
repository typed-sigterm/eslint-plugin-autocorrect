import type { ESLint } from 'eslint';
import { version } from '../package.json';
import correct from './rule';

export default {
  meta: {
    name: 'eslint-plugin-autocorrect',
    version,
  },

  rules: {
    correct,
  },
} satisfies ESLint.Plugin;
