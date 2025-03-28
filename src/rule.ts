import type { ESLint, SourceCode } from 'eslint';
import { lintFor, loadConfig } from 'autocorrect-node';
import { getConfig, getIgnorer } from './config';

type Rule = Exclude<ESLint.Plugin['rules'], undefined>[string];

loadConfig(getConfig());

const ignorer = getIgnorer();

const rule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    docs: {
      recommended: true,
    },
  },

  create(ctx) {
    const sourceCode = ctx.sourceCode as SourceCode;
    if (!('getText' in sourceCode) || !('getIndexFromLoc' in sourceCode))
      return {};
    if (ignorer.isIgnored(ctx.filename))
      return {};
    const res = lintFor(sourceCode.getText(), ctx.filename);

    for (const line of res.lines) {
      const start = { line: line.l, column: line.c - 1 };
      const end = { line: line.l, column: line.c - 1 + line.old.length };
      ctx.report({
        message: line.new, 
        loc: { start, end },
        fix: f => f.replaceTextRange(
          [sourceCode.getIndexFromLoc(start), sourceCode.getIndexFromLoc(end)],
          line.new,
        ),
      });
    };

    return {};
  },
} satisfies Rule;

export default rule;
