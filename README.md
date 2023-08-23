<div align="center">
  <img src="./assets/screenshot.png" width="70%" />
</div>

# ghget

<a href="https://www.npmjs.com/package/ghget-cli"><img src="https://img.shields.io/npm/v/ghget-cli"></a>
[![CI](https://github.com/bisquit/ghget/actions/workflows/ci.yml/badge.svg)](https://github.com/bisquit/ghget/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bisquit/ghget/branch/main/graph/badge.svg?token=CLG9UC6RG9)](https://codecov.io/gh/bisquit/ghget)

Download a directory or file from a GitHub URL you are viewing.

## Requirements

The corresponding CLI must be installed and authenticated.

- For GitHub, install [GitHub CLI](https://cli.github.com/)
  - then [`gh auth login`](https://cli.github.com/manual/gh_auth_login)

<details>
<summary>Why install CLI?</summary>

<br>

This tool uses GitHub or GitLab rest api to fetch repository archive.
It is possible to authenticate with an access token, but an additional token must be issued, which must then be passed to the tool.

To keep it simple and robust, we are taking advantage of the CLI's authentication feature.
</details>

## Install

You can quickly try with `npx`

```sh
npx ghget-cli@latest https://github.com/bisquit/ghget/tree/main/sample
```

or install globally

<details>
<summary>npm</summary>

<br>

```sh
npm i -g ghget-cli
```
</details>

<details>
<summary>yarn</summary>

<br>

```sh
yarn global add ghget-cli
```
</details>

<details>
<summary>pnpm</summary>

<br>

```sh
pnpm add -g ghget-cli
```
</details>

## Usage

Hit `ghget <url>`.

```sh
ghget https://github.com/bisquit/ghget/tree/main/sample
```

See [examples](https://github.com/bisquit/ghget/blob/main/e2e/README.md#for-github).

## How it works

This tool fetches archive(.zip) with API, and
after user confirmed, decompresses it and copies into current directory.

Because branches can include `/`, we cannot distinguish the URL `main/src` is which:

- a) `main/src` branch
- b) `main` branch and `src` directory

So it attempts to fetch archive with "possible refs" (in this case, `main` and `main/src`) concurrently.

It takes a bit networking cost, but works faster than `git clone`.

## Related and Comparison

This tool is initialy inspired by

- https://github.com/Rich-Harris/degit
- https://github.com/unjs/giget

While these are primarily intended for **scaffolding**, this tool is designed for **getting a portion of the repository**.

Also I aimed for intuitive commands you don't need to remember how to specify.
