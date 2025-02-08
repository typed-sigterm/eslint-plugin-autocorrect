import { RuleTester } from 'eslint';
import { rule } from '../src/rule';
import { test } from 'bun:test';

const tester = new RuleTester();

test('rule', () => {
  tester.run('rule', rule, {
    valid: [{
      filename: '.js',
      code: 'f("Hello 世界")',
    }, {
      filename: '.js',
      code: 'f("Hello，世界")\nf("。。。")',
    }],
    invalid: [{
      filename: '.js',
      code: 'console.log("Hello世界")',
      errors: 1,
      output: 'console.log("Hello 世界")',
    }, {
      filename: '.js',
      code: 'f("Hello ，世界")\nf("啊 ？")',
      errors: 2,
      output: 'f("Hello，世界")\nf("啊？")',
    }],
  });
});
