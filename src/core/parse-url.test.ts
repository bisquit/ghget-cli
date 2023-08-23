import { describe, expect, test } from 'vitest';

import { parseGithubUrl, parseGitlabUrl, parseUrl } from './parse-url';

describe('detect provider', () => {
  test('github', async () => {
    expect((await parseUrl('https://github.com/bisquit/ghget')).provider).toBe(
      'github',
    );
  });

  test('gitlab', async () => {
    expect((await parseUrl('https://gitlab.com/bisquit/ghget')).provider).toBe(
      'gitlab',
    );
  });

  test('bitbucket', async () => {
    await expect(() =>
      parseUrl('https://bitbucket.org/bisquit/ghget/src/master'),
    ).rejects.toThrowError('not supported');
  });

  test('others', async () => {
    await expect(() => parseUrl('https://google.com')).rejects.toThrowError(
      'url',
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
    ${'https://github.com/bisquit/ghget'}                               | ${'bisquit/ghget'} | ${undefined}
    ${'https://github.com/bisquit/ghget/'}                              | ${'bisquit/ghget'} | ${undefined}
    ${'https://github.com/bisquit/ghget/tree'}                          | ${'bisquit/ghget'} | ${undefined}
    ${'https://github.com/bisquit/ghget/tree/'}                         | ${'bisquit/ghget'} | ${undefined}
    ${'https://github.com/bisquit/ghget/tree/tests/'}                   | ${'bisquit/ghget'} | ${'tests/'}
    ${'https://github.com/bisquit/ghget/tree/tests/basic/src/x'}        | ${'bisquit/ghget'} | ${'tests/basic/src/x'}
    ${'https://github.com/bisquit/ghget/blob/tests/basic/src/x/y'}      | ${'bisquit/ghget'} | ${'tests/basic/src/x/y'}
    ${'https://github.com/bisquit/ghget/blob/tests/basic/src/x/y/z.ts'} | ${'bisquit/ghget'} | ${'tests/basic/src/x/y/z.ts'}
    ${'https://github.com/bisquit/ghget/blob/v0.0.1/index.ts'}          | ${'bisquit/ghget'} | ${'v0.0.1/index.ts'}
    ${'https://github.com/bisquit/ghget/tree/9541f1/index.ts'}          | ${'bisquit/ghget'} | ${'9541f1/index.ts'}
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
    ${'https://gitlab.com/bisquit/ghget'}                                 | ${'bisquit/ghget'} | ${undefined}
    ${'https://gitlab.com/bisquit/ghget/'}                                | ${'bisquit/ghget'} | ${undefined}
    ${'https://gitlab.com/bisquit/ghget/-'}                               | ${'bisquit/ghget'} | ${undefined}
    ${'https://gitlab.com/bisquit/ghget/-/'}                              | ${'bisquit/ghget'} | ${undefined}
    ${'https://gitlab.com/bisquit/ghget/-/tree/tests/'}                   | ${'bisquit/ghget'} | ${'tests/'}
    ${'https://gitlab.com/bisquit/ghget/-/tree/tests/basic/src/x'}        | ${'bisquit/ghget'} | ${'tests/basic/src/x'}
    ${'https://gitlab.com/bisquit/ghget/-/blob/tests/basic/src/x/y'}      | ${'bisquit/ghget'} | ${'tests/basic/src/x/y'}
    ${'https://gitlab.com/bisquit/ghget/-/blob/tests/basic/src/x/y/z.ts'} | ${'bisquit/ghget'} | ${'tests/basic/src/x/y/z.ts'}
    ${'https://gitlab.com/bisquit/ghget/-/blob/v0.0.1/index.ts'}          | ${'bisquit/ghget'} | ${'v0.0.1/index.ts'}
    ${'https://gitlab.com/bisquit/ghget/-/tree/9541f1/index.ts'}          | ${'bisquit/ghget'} | ${'9541f1/index.ts'}
  `('returns $repo and $rest', async ({ url, repo, rest }) => {
    expect(await parseGitlabUrl(url)).toEqual({ repo, rest });
  });
});
