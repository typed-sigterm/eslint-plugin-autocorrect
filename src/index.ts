import type { ESLint } from 'eslint';
import { version } from '../package.json';
import correct from './rule';

const plugin: ESLint.Plugin = {
  meta: {
    name: 'autocorrect',
    version,
  },
  rules: {
    correct,
  },
};

export default plugin;
