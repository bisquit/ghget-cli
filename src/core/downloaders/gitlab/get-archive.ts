import { $ } from 'execa';

export async function getArchive({
  repo,
  ref,
  redirectTo,
}: {
  repo: string;
  ref?: string;
  redirectTo: string;
}) {
  // https://docs.gitlab.com/ee/api/rest/index.html#namespaced-path-encoding
  const encodedRepo = repo.replace('/', '%2F');

  // https://docs.gitlab.com/ee/api/repositories.html#get-file-archive
  const result = await $`glab api projects/${encodedRepo}/repository/archive${
    ref ? `?sha=${ref}` : ''
  }`.pipeStdout?.(redirectTo);
  if (result?.stderr) {
    throw new Error(`${result.stderr}`);
  }
}
