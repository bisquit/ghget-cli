import { mkdir } from '../../../utils/mkdir';
import { createFileComponents } from '../../file-components';
import { createPossibleRefs } from '../../possible-refs';
import { Downloader } from '../types';
import { getArchive } from './get-archive';

export const downloader: Downloader = async ({ repo, rest, archiveDir }) => {
  if (!rest) {
    const archiveDist = createFileComponents(`${archiveDir}/archive.zip`);
    await getArchive({ repo, redirectTo: archiveDist.filepath });

    return {
      repo,
      archive: archiveDist,
    };
  }

  const possibleRefs = createPossibleRefs(rest);

  const { ref: resolvedRef, archive } = await Promise.any(
    possibleRefs.map(async (ref, i) => {
      await mkdir(`${archiveDir}/${i}`);
      const archiveDist = createFileComponents(
        `${archiveDir}/${i}/archive.zip`
      );
      await getArchive({ repo, ref, redirectTo: archiveDist.filepath });
      return { ref, archive: archiveDist };
    })
  );

  const subpath = rest.replace(resolvedRef, '');

  return {
    repo,
    ref: resolvedRef,
    subpath: subpath,
    archive: archive,
  };
};
