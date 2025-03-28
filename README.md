# `eslint-plugin-autocorrect`

Integrate [AutoCorrect](https://github.com/huacnlee/autocorrect) with ESLint.

## Usage

Install `eslint-plugin-autocorrect` using your package manager, and add this to `eslint.config.js`:

```js
import { defineConfig } from 'eslint/config';
import autocorrect from 'eslint-plugin-autocorrect';

export default defineConfig([
  {
    plugins: {
      autocorrect,
    },
    rules: {
      'autocorrect/issue': 'error',
    },
  },
]);
```

The plugin provides a single rule `autocorrect/issue` to report issues found by AutoCorrect, and auto-fixes.

The plugin requires eslint >= 9.
