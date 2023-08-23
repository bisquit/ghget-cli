/**
 * @example
 * "x/y/z" => ["x", "x/y", "x/y/z"]
 */
export function createPossibleRefs(unknownRef: string) {
  const possibleRefs = unknownRef.split('/').map((_, i, arr) => {
    return arr.slice(0, i + 1).join('/');
  });

  return possibleRefs;
}
