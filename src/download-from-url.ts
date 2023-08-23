import { cancel, confirm, isCancel, log, outro, spinner } from '@clack/prompts';
import colors from 'picocolors';

import { downloaderFor } from './core/downloaders';
import { createFileComponents } from './core/file-components';
import { parseUrl } from './core/parse-url';
import { unzip } from './core/unzip';
import { copy } from './utils/copy';
import { createTempDir } from './utils/create-temp';
import { debugLog } from './utils/debug';
import { fileExists } from './utils/file-exists';
import { rmrf } from './utils/rm';

export async function downloadFromUrl(url: string) {
  try {
    const { provider, repo, rest } = await parseUrl(url);

    const { dir: archiveDir, cleanup: archiveDirCleanup } =
      await createTempDir();
    debugLog({ archiveDir });

    const cancelProcess = async () => {
      await archiveDirCleanup();
      cancel('Cancelled.');
      process.exit(0);
    };

    // because windows won't be terminated by @clack/prompts `isCancel`,
    // manually hook terminated event and cleanup.
    process.on('SIGINT', async () => {
      debugLog('SIGINT');
      await cancelProcess();
    });

    try {
      const s = spinner();
      s.start(`Downloading archive`);

      const { ref, subpath, archive } = await downloaderFor(provider)({
        repo,
        rest,
        archiveDir,
      });
      const reponame = repo.split('/')[1];

      s.stop('Downloaded archive from ' + `${repo}${ref ? `#${ref}` : ''}`);

      const filename = subpath
        ? createFileComponents(subpath).filename
        : reponame;
      const confirmed = await confirm({
        message: `Copy ${`${colors.cyan(filename)} `}to current directory?`,
      });

      if (!confirmed || isCancel(confirmed)) {
        await cancelProcess();
      }

      const isFileExists = fileExists(filename);

      if (isFileExists) {
        log.warning(`Current directory already has a ${colors.cyan(filename)}`);
        const acceptOverwrite = await confirm({
          message: `Do you want to continue?`,
          active: 'Yes, overwrite it',
          initialValue: false,
        });

        if (!acceptOverwrite || isCancel(acceptOverwrite)) {
          await cancelProcess();
        }

        // cp failed if file exists, so remove it before.
        await rmrf(filename);
      }

      await unzip(archive.filepath, `${archive.filedir}/${reponame}`);

      const copySrc = `${archive.filedir}/${reponame}${subpath ?? ''}`;
      const copyDist = process.cwd();
      debugLog({ copySrc, copyDist });
      await copy(copySrc, copyDist);

      await archiveDirCleanup();
    } catch (e) {
      await archiveDirCleanup();
      const message = createErrorMessage(e);
      throw new Error(message);
    }

    outro(colors.cyan('✔ Successfully copied.'));
    process.exit(0);
  } catch (e: unknown) {
    outro(colors.red(`${e}`));
    process.exit(1);
  }
}

function createErrorMessage(e: unknown): string {
  const singleErrorMessage = (e: unknown) => {
    if ('stderr' in (e as any)) {
      return (e as any).stderr;
    }

    return (e as Error).message;
  };

  if (e instanceof AggregateError) {
    return singleErrorMessage(e.errors[0]);
  } else {
    return singleErrorMessage(e);
  }
}
