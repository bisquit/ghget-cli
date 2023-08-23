import { describe, expect, test } from 'vitest';

import { parseGithubUrl, parseGitlabUrl, parseUrl } from './parse-url';

describe('detect provider', () => {
  test('github', async () => {
    expect((await parseUrl('https://github.com/bisquit/rpget')).provider).toBe(
      'github'
    );
  });

  test('gitlab', async () => {
    expect((await parseUrl('https://gitlab.com/bisquit/rpget')).provider).toBe(
      'gitlab'
    );
  });

  test('bitbucket', async () => {
    await expect(() =>
      parseUrl('https://bitbucket.org/bisquit/rpget/src/master')
    ).rejects.toThrowError('not supported');
  });

  test('others', async () => {
    await expect(() => parseUrl('https://google.com')).rejects.toThrowError(
      'url'
    );
  });
});

describe('parseGithubUrl()', () => {
  describe('error', () => {
    test.each([
      'https://github.com',
      'https://github.com/bisquit',
      'https://github.com/bisquit/',
    ])('should throw invalid url error', async (url) => {
      await expect(() => parseGithubUrl(url)).rejects.toThrowError('url');
    });
  });

  test.each`
    url                                                                 | repo               | rest
    ${'https://github.com/bisquit/rpget'}                               | ${'bisquit/rpget'} | ${undefined}
    ${'https://github.com/bisquit/rpget/'}                              | ${'bisquit/rpget'} | ${undefined}
    ${'https://github.com/bisquit/rpget/tree'}                          | ${'bisquit/rpget'} | ${undefined}
    ${'https://github.com/bisquit/rpget/tree/'}                         | ${'bisquit/rpget'} | ${undefined}
    ${'https://github.com/bisquit/rpget/tree/tests/'}                   | ${'bisquit/rpget'} | ${'tests/'}
    ${'https://github.com/bisquit/rpget/tree/tests/basic/src/x'}        | ${'bisquit/rpget'} | ${'tests/basic/src/x'}
    ${'https://github.com/bisquit/rpget/blob/tests/basic/src/x/y'}      | ${'bisquit/rpget'} | ${'tests/basic/src/x/y'}
    ${'https://github.com/bisquit/rpget/blob/tests/basic/src/x/y/z.ts'} | ${'bisquit/rpget'} | ${'tests/basic/src/x/y/z.ts'}
    ${'https://github.com/bisquit/rpget/blob/v0.0.1/index.ts'}          | ${'bisquit/rpget'} | ${'v0.0.1/index.ts'}
    ${'https://github.com/bisquit/rpget/tree/9541f1/index.ts'}          | ${'bisquit/rpget'} | ${'9541f1/index.ts'}
  `('returns $repo and $rest', async ({ url, repo, rest }) => {
    expect(await parseGithubUrl(url)).toEqual({ repo, rest });
  });
});

describe('parseGitlabUrl()', () => {
  describe('error', () => {
    test.each([
      'https://gitlab.com',
      'https://gitlab.com/bisquit',
      'https://gitlab.com/bisquit/',
    ])('should throw invalid url error', async (url) => {
      await expect(() => parseGitlabUrl(url)).rejects.toThrowError('url');
    });
  });

  test.each`
    url                                                                   | repo               | rest
    ${'https://gitlab.com/bisquit/rpget'}                                 | ${'bisquit/rpget'} | ${undefined}
    ${'https://gitlab.com/bisquit/rpget/'}                                | ${'bisquit/rpget'} | ${undefined}
    ${'https://gitlab.com/bisquit/rpget/-'}                               | ${'bisquit/rpget'} | ${undefined}
    ${'https://gitlab.com/bisquit/rpget/-/'}                              | ${'bisquit/rpget'} | ${undefined}
    ${'https://gitlab.com/bisquit/rpget/-/tree/tests/'}                   | ${'bisquit/rpget'} | ${'tests/'}
    ${'https://gitlab.com/bisquit/rpget/-/tree/tests/basic/src/x'}        | ${'bisquit/rpget'} | ${'tests/basic/src/x'}
    ${'https://gitlab.com/bisquit/rpget/-/blob/tests/basic/src/x/y'}      | ${'bisquit/rpget'} | ${'tests/basic/src/x/y'}
    ${'https://gitlab.com/bisquit/rpget/-/blob/tests/basic/src/x/y/z.ts'} | ${'bisquit/rpget'} | ${'tests/basic/src/x/y/z.ts'}
    ${'https://gitlab.com/bisquit/rpget/-/blob/v0.0.1/index.ts'}          | ${'bisquit/rpget'} | ${'v0.0.1/index.ts'}
    ${'https://gitlab.com/bisquit/rpget/-/tree/9541f1/index.ts'}          | ${'bisquit/rpget'} | ${'9541f1/index.ts'}
  `('returns $repo and $rest', async ({ url, repo, rest }) => {
    expect(await parseGitlabUrl(url)).toEqual({ repo, rest });
  });
});
