import type { ESLint } from 'eslint';
import { version } from '../package.json';
import issue from './rule';

const plugin = {
  meta: {
    name: 'autocorrect',
    version,
  },
  rules: {
    issue,
  },
} satisfies ESLint.Plugin;

export default plugin;
