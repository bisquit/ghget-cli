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
  // https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#download-a-repository-archive-zip
  await $`gh api ${[
    '-H',
    'Accept: application/vnd.github+json',
    '-H',
    'X-GitHub-Api-Version: 2022-11-28',
  ]} /repos/${repo}/zipball/${ref ?? ''}`.pipeStdout?.(redirectTo);
}
