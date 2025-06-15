import path from 'node:path';
import process from 'node:process';
import { it } from 'bun:test';
import { RuleTester } from 'eslint';
import correct from '../src/rule';

const cwd = process.cwd();
const tester = new RuleTester();

it('should work', () => tester.run('rule', correct, {
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
}));

it('should respect .autocorrectrc', () => tester.run('rule', correct, {
  valid: [{
    filename: path.join(cwd, 'ignored.js'),
    code: 'f("没有error")', // see .autocorrectrc
  }, {
    filename: path.join(cwd, 'ignored.js'),
    code: 'f("没有 error")',
  }],

  invalid: [],
}));

it('should respect .autocorrectignore', () => tester.run('rule', correct, {
  valid: [{
    filename: path.resolve(cwd, 'ignored.js'),
    code: 'f("有error")',
  }, {
    filename: path.resolve(cwd, 'ignored.js'),
    code: 'f("有 error")',
  }],

  invalid: [],
}));

it('should work w/ messageStyle option', () => tester.run('rule', correct, {
  valid: [],
  invalid: [{
    filename: '.js',
    code: 'console.log("Hello世界")',
    options: [{ messageStyle: 'correct' }],
    errors: [{ message: '"Hello 世界"' }],
    output: 'console.log("Hello 世界")',
  }, {
    filename: '.js',
    code: 'console.log("Hello世界")',
    options: [{ messageStyle: 'default' }],
    errors: [{ message: 'Correct it' }],
    output: 'console.log("Hello 世界")',
  }],
}));
