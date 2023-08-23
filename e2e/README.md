# E2E

Curretly, E2E is hand-testing for cross patterns.

- Platform (Mac)
- Provider (GitHub)
- Download (directory, file, entire repository, cancel, error)

## Setup

```sh
# remove installed version
pnpm rm -g ghget

# install latest dependencies
pnpm i

# Static analysis
pnpm staticcheck

# build
pnpm build

# linking this pkg to global
pnpm link -g

# Move to clean directory (here use Desktop)
cd ~/Desktop
```

Also, authenticate GitHub CLI and GLab CLI.

## Run

### on Mac

#### for GitHub

```sh
# GitHub x directory
ghget https://github.com/bisquit/ghget/tree/main/sample
#==> sample

# GitHub x file
ghget https://github.com/bisquit/ghget/blob/main/sample/README.md
#==> README.md

# GitHub x root
ghget https://github.com/bisquit/ghget
#==> ghget

# GitHub x cancel
ghget https://github.com/bisquit/ghget # Then cancel confirm with `No`
#==> 'Cancelled.'
ghget https://github.com/bisquit/ghget # Then hit Ctrl + C
#==> 'Cancelled.'

# GitHub x error
ghget https://github.com/bisquit/ghget/tree/m
#==> 'ERROR'
```
