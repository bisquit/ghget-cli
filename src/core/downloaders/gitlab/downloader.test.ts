import { describe, expect, test, vi } from 'vitest';

import { downloader } from './downloader';

vi.mock('./get-archive.ts', async () => {
  return {
    getArchive: vi.fn(),
  };
});

vi.mock('../../../utils/mkdir.ts', async () => {
  return {
    mkdir: vi.fn(),
  };
});

describe('github downloader', () => {
  test('repository', async () => {
    const result = await downloader({
      repo: 'bisquit/rpget',
      archiveDir: 'tmp',
    });

    expect(result.repo).toBe('bisquit/rpget');
    expect(result.archive).toBeDefined();
  });

  test('directory', async () => {
    const result = await downloader({
      repo: 'bisquit/rpget',
      rest: 'main/sample/x',
      archiveDir: 'tmp',
    });

    expect(result.repo).toBe('bisquit/rpget');
    expect(result.ref).toBe('main');
    expect(result.subpath).toBe('/sample/x');
    expect(result.archive).toBeDefined();
  });
});
