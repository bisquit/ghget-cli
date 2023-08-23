import { basename, dirname, extname } from 'node:path';

export type FileComponents = {
  /**
   * @example
   * //=> 'x/y/z/sample.ts'
   */
  filepath: string;

  /**
   * @example
   * //=> 'x/y/z'
   */
  filedir: string;

  /**
   * @example
   * //=> 'sample.ts'
   */
  filename: string;

  /**
   * @example
   * //=> 'sample'
   */
  name: string;

  /**
   * @example
   * //=> '.ts'
   */
  extension: string;
};

/**
 * Create file related components
 */
export function createFileComponents(path: string): FileComponents {
  const filedir = dirname(path);
  const filename = basename(path);
  const extension = extname(filename);
  const name = filename.replace(extension, '');

  return {
    filepath: path,
    filedir,
    filename,
    name,
    extension,
  };
}
