import { expect, test } from 'vitest';

import { createPossibleRefs } from './possible-refs';

test('createPossibleRefs()', async () => {
  expect(createPossibleRefs('x/y/z/index.ts')).toEqual([
    'x',
    'x/y',
    'x/y/z',
    'x/y/z/index.ts',
  ]);
});
