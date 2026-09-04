# Contributing

Thanks for your interest in contributing to `stimulus-use`!

## Development

- Fork the project locally
- `yarn install`
- `yarn start` - to run the local dev server with examples
- `yarn test` - to run the unit tests
- `yarn lint` - to run the linter with ESLint
- `yarn format` - to format changes with Prettier
- `yarn build` - to bundle the app into static files for production

## Preview builds

Commits on `main` and pull requests opened by maintainers are published as preview packages to [pkg.pr.new](https://pkg.pr.new/~/stimulus-use/stimulus-use), and a bot comments the install command on the pull request.

For a pull request from a fork, a maintainer needs to add the `release-preview` label to opt it in.

## Documentation

The documentation site is built with [VitePress](https://vitepress.dev/) and lives in the [`docs/`](./docs) directory.

- `yarn docs:dev` - to run the documentation site locally
- `yarn docs:build` - to build the documentation site
