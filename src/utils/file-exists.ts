import { existsSync } from 'node:fs';

export function fileExists(path: string) {
  return existsSync(path);
}
