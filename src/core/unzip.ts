import decompress from 'decompress';

/**
 * decompress zip and extract to dist directory
 *
 * zip is possibly decompressed file or directory,
 * so if directory zip, unzip it becomes directory,
 * but if file zip, unzip it becomes file.
 *
 * if unzipping directoroy and direcoty inside dist, it is not ease to use because of nested structure, so this function extracting it and move contensts to dist.
 *
 * @example
 * case1. sample.zip (original is directory containing 'file-1', 'file-2', 'dir-1')
 *
 * await unzip('sample.zip', 'dist');
 * #==>
 * dist/
 *   dir-1/
 *   file-1
 *   file-2
 *
 * case2. sample.zip (original is 'file-1')
 *
 * await unzip('sample.zip', 'dist');
 * #==>
 * dist/
 *   file-1
 */
export async function unzip(zipSrc: string, dist: string) {
  await decompress(zipSrc, dist, {
    strip: 1,
  });
}
