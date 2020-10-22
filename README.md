<p align="center">
  <img src="docs/assets/stimulus-use-logo.png" width="500" srcset="docs/assets/stimulus-use-logo@2x.png 2x, docs/assets/stimulus-use-logo@3x.png 3x" />
</p>

<p align="center">
  <b>A collection of composable behaviors for your Stimulus Controllers</b>
  </br>
  </br>
  <img src="https://badgen.net/npm/v/stimulus-use" alt="npm version">
  <a href="https://bundlephobia.com/result?p=stimulus-use" rel="nofollow">
    <img src="https://badgen.net/bundlephobia/minzip/stimulus-use" alt="minified + gzip size">
  </a>
  <img src="https://badgen.net/npm/types/tslib" alt="types included">
  <img src="https://badgen.net/npm/license/stimulus-use" alt="types included">
  <img src="./docs/assets/example-buildstatus-badge.png" alt="Sauce test status">
</p>
<br />

<p align="center">
  <img src="./docs/assets/stimulus-use example.png" alt="Stimulus Use Example">
</p>

<br />

- **New lifecycle behaviors**: adds new standard behaviors to your Stimulus controllers.
- **Composable**: compose at will different behaviors in a single controller.
- **Modular**: built as ES6 modules, just import what you need and tree shaking will remove the rest.
- **Typescript**: Types available, better autocompletion.
- **Tiny**: 1k gzip
- **MIT Licensed**: free for personal and commercial use.

## Getting Started

npm
```bash
npm i stimulus-use
```

yarn
```bash
yarn add stimulus-use
```

## Modules and Controllers

- **Observers**

  This set of mixins is built around the [`Observer APIs`](https://developer.mozilla.org/en-US/docs/Web/API) and custom events to enhance your controllers with new behaviors.

  | Mixin | Description | NEW Callbacks |
  |-----------------------|-------------|---------------------|
  |[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecyle callback **clickOutside**.|`clickOutside`|
  |[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
  |[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
  |[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
  |[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecyle callback **resize**.|`resize`|
  |[`useWindowSize`](./docs/use-window-size.md)| Tracks the size of the `window` object and adds a new lifecyle callback **windowResize**.|`windowResize`|

- **Optimization**
  - [`useMemo`](./docs/use-memo.md) &mdash; memoize expensive getters by mixing in `useMemo` and adding a static `memos` array.

- **Application**
  - [`useApplication, ApplicationController`](./docs/application-controller.md) &mdash; supercharged controller for your application.


## Extend or compose

Stimulus-use can be used in two ways: **extending** or **composing**

**Extending**

You can create your Stimulus controller from a pre-built Stimulus-use controller which offers the new behavior you're looking for.
This method works perfectly when you only need a single behavior for your controller.

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  appear(entry) {
    // triggered when the element appears within the viewport
  }
}
```

**Composing**

When you need multiple behaviors or you are already extending your controller from another one,
you can easily add new behavior with the built-in `use` functions.

```js
import { Controller } from 'stimulus'
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
  }

  appear(entry) {
    // triggered when the element appears within the viewport
  }

  resize({ height, width }) {
    // trigered when the element is resized
  }
}
```

## Launch a local playground

Play with Stimulus-use controllers locally before adding them to one of your projects.

Fork and clone the repo (SSH):
```bash
git clone git@github.com:stimulus-use/stimulus-use.git
```

Once in your local stimulus-use directory, run:
```bash
yarn install
```

Then, build the library locally
```bash
yarn build
```

Launch the playground locally (available at http://localhost:8080/ by default):
```bash
yarn start
```

## Contributors ✨

Made with :heart: by [@adrienpoly](https://twitter.com/adrienpoly) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://marcoroth.dev"><img src="https://avatars2.githubusercontent.com/u/6411752?v=4" width="80px;" alt=""/><br /><sub><b>Marco Roth</b></sub></a><br /><a href="#infra-marcoroth" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=marcoroth" title="Code">💻</a></td>
    <td align="center"><a href="http://philippdaun.net"><img src="https://avatars3.githubusercontent.com/u/22225348?v=4" width="80px;" alt=""/><br /><sub><b>Philipp Daun</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Adaun" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://code.digimonkey.com"><img src="https://avatars0.githubusercontent.com/u/74207?v=4" width="80px;" alt=""/><br /><sub><b>M. E. Patterson</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amepatterson" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.argpar.se"><img src="https://avatars3.githubusercontent.com/u/2124818?v=4" width="80px;" alt=""/><br /><sub><b>Jonathan Sundqvist</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=jonathan-s" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.rodloboz.com"><img src="https://avatars3.githubusercontent.com/u/23458442?v=4" width="80px;" alt=""/><br /><sub><b>Rui Freitas</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=rodloboz" title="Documentation">📖</a></td>
    <td align="center"><a href="https://koudetat.co"><img src="https://avatars0.githubusercontent.com/u/7533706?v=4" width="80px;" alt=""/><br /><sub><b>Nicolas Filzi</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=nfilzi" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bdarcet"><img src="https://avatars1.githubusercontent.com/u/9220278?v=4" width="80px;" alt=""/><br /><sub><b>Benjamin Darcet</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=bdarcet" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/juancarlosasensio"><img src="https://avatars3.githubusercontent.com/u/37816105?v=4" width="80px;" alt=""/><br /><sub><b>juancarlosasensio</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=juancarlosasensio" title="Documentation">📖</a></td>
    <td align="center"><a href="https://lidqqq.dev/"><img src="https://avatars3.githubusercontent.com/u/39523918?v=4" width="80px;" alt=""/><br /><sub><b>lidqqq</b></sub></a><br /><a href="#infra-lidqqq" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Alidqqq" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.julianrubisch.at"><img src="https://avatars0.githubusercontent.com/u/4352208?v=4" width="80px;" alt=""/><br /><sub><b>Julian Rubisch</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=julianrubisch" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Acknowledgments

Continuous integration and cross browser testing is generously provided Sauce Labs.

[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)

## 🚧 in construction

matrix

[![Sauce Test Status](https://app.saucelabs.com/browser-matrix/adrienpoly.svg)](https://app.saucelabs.com/u/adrienpoly)

badge

[![Sauce Test Status](https://app.saucelabs.com/buildstatus/YOUR_SAUCE_USERNAME)](https://app.saucelabs.com/u/adrienpoly)
