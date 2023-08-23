import { expect, test } from 'vitest';

import { createFileComponents } from './file-components';

test('createFileComponents()', async () => {
  expect(createFileComponents('x/y/z/index.ts')).toEqual({
    filepath: 'x/y/z/index.ts',
    filedir: 'x/y/z',
    filename: 'index.ts',
    name: 'index',
    extension: '.ts',
  });
});
