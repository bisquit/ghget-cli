import {
  anyOf,
  char,
  charNotIn,
  createRegExp,
  maybe,
  oneOrMore,
} from 'magic-regexp';

import { Provider, RepositoryComponentsWithRest } from '../types';

export async function parseUrl(
  url: string
): Promise<RepositoryComponentsWithRest & { provider: Provider }> {
  if (url.startsWith('https://github.com/')) {
    return {
      provider: 'github',
      ...(await parseGithubUrl(url)),
    };
  } else if (url.startsWith('https://gitlab.com/')) {
    return {
      provider: 'gitlab',
      ...(await parseGitlabUrl(url)),
    };
  } else if (url.startsWith('https://bitbucket.org/')) {
    throw new Error('bitbucket is not supported.');
  } else {
    throw new Error('url is not correct. `rpget -h` and see example.');
  }
}

export async function parseGithubUrl(
  url: string
): Promise<RepositoryComponentsWithRest> {
  const repoRegex = createRegExp(
    'https://github.com/',
    oneOrMore(charNotIn('/'))
      .and('/')
      .and(oneOrMore(charNotIn('/')))
      .groupedAs('repo'),
    maybe('/'),
    maybe(
      anyOf('tree/', 'blob/'),
      oneOrMore(char).groupedAs('rest'),
      maybe('/').at.lineEnd()
    )
  );

  const match = url.match(repoRegex);
  const repo = match?.groups.repo;
  if (!repo) {
    throw new Error(
      'url is not a correct Github repository. `rpget -h` and see example.'
    );
  }

  const rest = match.groups.rest;
  return { repo, rest };
}

export async function parseGitlabUrl(
  url: string
): Promise<RepositoryComponentsWithRest> {
  const repoRegex = createRegExp(
    'https://gitlab.com/',
    oneOrMore(charNotIn('/'))
      .and('/')
      .and(oneOrMore(charNotIn('/')))
      .groupedAs('repo'),
    maybe('/'),
    maybe(
      anyOf('-/tree/', '-/blob/'),
      oneOrMore(char).groupedAs('rest'),
      maybe('/').at.lineEnd()
    )
  );

  const match = url.match(repoRegex);
  const repo = match?.groups.repo;
  if (!repo) {
    throw new Error(
      'url is not a correct Gitlab repository. `rpget -h` and see example.'
    );
  }

  const rest = match.groups.rest;
  return { repo, rest };
}
