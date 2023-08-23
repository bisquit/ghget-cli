import { RepositoryComponentsWithDetail } from '../../types';
import { FileComponents } from '../file-components';

/**
 * Downloader receives
 * - incomplete repository information
 * - directory that archive saved for
 *
 * and do
 * - get a repository detailed and return
 * - download archive and save to directory
 */
export type Downloader = (props: {
  repo: string;
  rest?: string;
  archiveDir: string;
}) => Promise<
  RepositoryComponentsWithDetail & {
    archive: FileComponents;
  }
>;
