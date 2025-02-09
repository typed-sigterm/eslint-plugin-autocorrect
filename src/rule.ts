import type { ESLint, SourceCode } from 'eslint';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initSync, lintFor } from 'autocorrect-wasm';

type Rule = Exclude<ESLint.Plugin['rules'], undefined>[string];

interface LintResult {
  filepath: string
  lines: Array<{
    l: number
    c: number
    old: string
    new: string
    serverity: Severity
  }>
  error: string
}

enum Severity {
  Pass = 0,
  Error = 1,
  Warning = 2,
}

const wasmUrl = import.meta.resolve('autocorrect-wasm/autocorrect_wasm_bg.wasm');
const wasm = readFileSync(fileURLToPath(wasmUrl));
initSync(wasm);

const rule: Rule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      error: 'Autocorrect error detected',
      warning: 'Autocorrect warning detected',
    },
    docs: {
      recommended: true,
    },
  },
  create(ctx) {
    const sourceCode = ctx.sourceCode as SourceCode;
    const res: LintResult = lintFor(sourceCode.getText(), ctx.filename ?? '');

    for (const line of res.lines) {
      const start = { line: line.l, column: line.c - 1 };
      const end = { line: line.l, column: line.c - 1 + line.old.length };
      ctx.report({
        messageId: line.serverity === Severity.Error ? 'error' : 'warning',
        loc: {
          start: { line: line.l, column: 0 },
          end: { line: line.l, column: line.old.length },
        },
        fix: f => f.replaceTextRange(
          [sourceCode.getIndexFromLoc(start), sourceCode.getIndexFromLoc(end)],
          line.new,
        ),
      });
    };

    return {};
  },
};

export default rule;
