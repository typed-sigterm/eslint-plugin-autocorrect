import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { Ignorer } from 'autocorrect-node';

const cwd = process.cwd();

export function getConfig() {
  // TODO: handle errors
  const p = path.resolve(cwd, '.autocorrectrc');
  if (!existsSync(p))
    return '';
  return readFileSync(p, 'utf8');
}

export const getIgnorer = () => new Ignorer(cwd);
