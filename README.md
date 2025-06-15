# `eslint-plugin-autocorrect`

Integrate [AutoCorrect](https://github.com/huacnlee/autocorrect) with ESLint.

The plugin requires eslint >= 9.

## Usage

Install `eslint-plugin-autocorrect` using your package manager, and add this to `eslint.config.js`:

```js
import autocorrect from 'eslint-plugin-autocorrect';
import { defineConfig } from 'eslint/config';

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

### Options

The `autocorrect/issue` rule accepts an optional object with the following properties:

- `messageStyle`: Configures the style of the error message.
    - `"default"` (default): Shows "Correct it" as the message.
    - `"correct"`: Shows the corrected text as the message.

Example configuration:

```js
export default defineConfig([
  {
    plugins: {
      autocorrect,
    },
    rules: {
      'autocorrect/issue': ['error', { messageStyle: 'correct' }],
    },
  },
]);
```
