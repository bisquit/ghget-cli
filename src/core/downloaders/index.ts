import { Provider } from '../../types';
import { downloader as githubDownloader } from './github/downloader';
import { downloader as gitlabDownloader } from './gitlab/downloader';
import { Downloader } from './types';

export function downloaderFor(provider: Provider): Downloader {
  switch (provider) {
    case 'github':
      return githubDownloader;
    case 'gitlab':
      return gitlabDownloader;
    default:
      throw new Error('downloader not defined.');
  }
}
