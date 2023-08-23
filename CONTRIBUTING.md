## develop

```sh
# Install dependencies
pnpm i

# Run src (index.ts) directly
pnpm dev
pnpm dev https://github.com/bisquit/rpget/tree/main/sample/dir-1
```

### Unit Testing

```sh
# Unit test
pnpm test
```

### E2E

[HERE](e2e/README.md)

### Test local build version behavior

```sh
# linking this pkg to global
pnpm link -g

# watch build
## normal build (which is the same as production shipped)
pnpm build --watch
## debug mode (log extra informations)
pnpm build:debug --watch

# Then, cd any directory
rpget
```

If you installed published version, be sure removing it to avoid confliction.

```sh
pnpm ls -g
pnpm rm -g rpget
```

## publish

```sh
pnpm release
#==> tag push triggers publish github actions
```
