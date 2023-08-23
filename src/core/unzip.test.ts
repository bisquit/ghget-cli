import { existsSync } from 'node:fs';
import { rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

import { beforeAll, describe, expect, test } from 'vitest';

import { unzip } from './unzip';

const testDir = resolve(process.cwd(), 'tmp-test-unzip');
const fixtureDir = resolve(process.cwd(), 'test/fixtures');

beforeAll(async () => {
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true, force: true });
  }
});

// see fixture structure at `test/fixtures/README.md`

describe('unzip()', () => {
  test('dir', async () => {
    await unzip(
      resolve(fixtureDir, 'sample.dir.zip'),
      resolve(testDir, 'case-dir')
    );

    expect((await stat(resolve(testDir, 'case-dir/file-1'))).isFile()).toBe(
      true
    );
    expect((await stat(resolve(testDir, 'case-dir/dir-1'))).isDirectory()).toBe(
      true
    );
    expect(
      (await stat(resolve(testDir, 'case-dir/dir-1/dir-2'))).isDirectory()
    ).toBe(true);
    expect(
      (await stat(resolve(testDir, 'case-dir/dir-1/file-2'))).isFile()
    ).toBe(true);
  });

  test('file', async () => {
    await unzip(
      resolve(fixtureDir, 'sample.file.zip'),
      resolve(testDir, 'case-file')
    );

    expect((await stat(resolve(testDir, 'case-file/file-1'))).isFile()).toBe(
      true
    );
  });
});
