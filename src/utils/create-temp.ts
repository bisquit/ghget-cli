import { temporaryDirectory } from 'tempy';

import { rmrf } from './rm';

export async function createTempDir(): Promise<{
  dir: string;
  cleanup: () => Promise<void>;
}> {
  const dir = temporaryDirectory();

  const cleanup = async () => {
    await rmrf(dir);
  };

  return { dir, cleanup };
}
