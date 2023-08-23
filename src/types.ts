export type Provider = 'github' | 'gitlab';

export type RepositoryComponentsBase = {
  /**
   * repository name with an account or organization
   *
   * @example
   * "bisquit/rpget"
   */
  repo: string;
};

export type RepositoryComponentsWithRest = RepositoryComponentsBase & {
  /**
   * Rest parts of the url that may be ref and optional directory
   *
   * @example
   * "main"
   * "feat/1"
   * "chore/1/src"
   */
  rest?: string;
};

/**
 * Components of a Github repository
 */
export type RepositoryComponentsWithDetail = RepositoryComponentsBase & {
  /**
   * ref (branch, tag, or commit)
   *
   * @example
   * "main"
   * "feat/some"
   * "v1.0.0"
   */
  ref?: string;

  /**
   * optional sub path
   *
   * @example
   * "/src"
   * "/src/index.ts"
   */
  subpath?: string;
};
