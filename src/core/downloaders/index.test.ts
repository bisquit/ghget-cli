import { expect, test } from 'vitest';

import { downloaderFor } from '.';
import { downloader as githubDownloader } from './github/downloader';
import { downloader as gitlabDownloader } from './gitlab/downloader';

test('downloaderFor()', async () => {
  expect(downloaderFor('github')).toEqual(githubDownloader);
  expect(downloaderFor('gitlab')).toEqual(gitlabDownloader);

  expect(() => downloaderFor('others' as any)).toThrowError();
});
