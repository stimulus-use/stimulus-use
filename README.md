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
- **Composable**: compose at will different behaviors in a single controller with mixins.
- **Modular**: built as ES6 modules, just import what you need and tree shaking will remove the rest.
- **Typescript**: Types available, better autocompletion.
- **Tiny**: 3k gzip + tree shaking 🌳🌳🌳

## Getting Started

⚠️ Stimulus 3 has several breaking changes. If you want to use Stimulus-Use with Stimulus 3 you can use the current beta version of Stimulus-Use `yarn add stimulus-use@beta`. All contribution to Stimulus 3 features are now on the [stimulus-3 branch](https://github.com/stimulus-use/stimulus-use/tree/stimulus-3)

npm
```bash
npm i stimulus-use
```

yarn
```bash
yarn add stimulus-use
```
## Documentation

We got you covered 👉 [stimulus-use.github.io/stimulus-use](https://stimulus-use.github.io/stimulus-use/#/)

## Mixins

### Observers

  This set of mixins is built around the [`Observer APIs`](https://developer.mozilla.org/en-US/docs/Web/API) and custom events to enhance your controllers with new behaviors.

  | Mixin | Description | NEW Callbacks |
  |-----------------------|-------------|---------------------|
  |[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecycle callback **clickOutside**.|`clickOutside`|
  |[`useHotkeys`](./docs/use-hotkeys.md)|Registers hotkeys using the [hotkeys-js](https://wangchujiang.com/hotkeys/) library and binds them to handler methods||
  |[`useHover`](./docs/use-hover.md)|Tracks the user's mouse movements over an element and adds **mouseEnter** and **mouseLeave** callbacks to your controller.|`mouseEnter` `mouseLeave`|
  |[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
  |[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
  |[`useMatchMedia`](./docs/use-match-media.md) | Tracks if the window matches a media query string.| `is[Name]`, `not[Name]` and `[name]Changed`|
  |[`useMutation`](./docs/use-mutation.md) | Tracks mutations on an element, its attributes and/or subtree. Adds a **mutate** callback to your controller.|`mutate`|
  |[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecycle callback **resize**.|`resize`|
  |[`useTargetMutation`](./docs/use-target-mutation.md) | Tracks when targets are added or removed from the controller's scope, or their contents changed. Adds **[target]TargetAdded** , **[target]TargetRemoved** and **[target]TargetChanged** callback to your controller for each specified target.| `[target]TargetAdded` `[target]TargetRemoved` `[target]TargetChanged`|
  |[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
  |[`useWindowFocus`](./docs/use-window-focus.md) </br>| Tracks the window focus and adds **focus**, **unfocus** callbacks to your controller.|`focus`</br> `unfocus`|
  |[`useWindowResize`](./docs/use-window-resize.md)| Tracks the size of the `window` object and adds a new lifecycle callback **windowResize**.|`windowResize`|

### Optimization

  A set of mixin to optimize performances.

  | Mixin| Description |
  |------|-------------|
  |[`useDebounce`](./docs/use-debounce.md)|Adds the ability to specify an array "debounces" of functions to   debounce.|
  |[`useMemo`](./docs/use-memo.md)|Memoize expensive getters by mixing in `useMemo` and adding a static   `memos` array.|
  |[`useThrottle`](./docs/use-throttle.md)|Adds the ability to specify an array "throttles" of functions to throttle.|

### Animation

  A set of mixin and controllers to build animations.

  | Mixin| Description |
  |------|-------------|
  |[`useTransition`](./docs/use-transition.md)|Mixin or controller to apply classes to various stages of an element's transition.|

### Application
  | Mixin | Description |
  |------|-------------|
  |[`useApplication, ApplicationController`](./docs/application-controller.md)| supercharged controller for your application.|
  |[`useDispatch`](./docs/use-dispatch.md)|Adds a dispatch helper function to emit custom events. Useful to communicate between different controllers.|
  |[`useMeta`](./docs/use-meta.md)|Adds getters to easily access <head> meta values.|

## Extend or compose

Stimulus-use can be used in two ways:  **composing* with mixins* or **extending built-in controllers**

**Composing with mixins**

This is the prefered approach as it bring the most flexibility. Simply import a mixin and apply it in the `connect` or `initialize` to adds new behaviors to you controller. You can combine several mixins within the same controller.

```js
import { Controller } from '@hotwired/stimulus'
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

**Extending built-in controllers**

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



## Contributors ✨

Made with :heart: by [@adrienpoly](https://twitter.com/adrienpoly) and all these wonderful contributors ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://marcoroth.dev"><img src="https://avatars2.githubusercontent.com/u/6411752?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marco Roth</b></sub></a><br /><a href="#infra-marcoroth" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=marcoroth" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/pulls?q=is%3Apr+reviewed-by%3Amarcoroth" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amarcoroth" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://philippdaun.net"><img src="https://avatars3.githubusercontent.com/u/22225348?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Philipp Daun</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Adaun" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://code.digimonkey.com"><img src="https://avatars0.githubusercontent.com/u/74207?v=4?s=80" width="80px;" alt=""/><br /><sub><b>M. E. Patterson</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Amepatterson" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.argpar.se"><img src="https://avatars3.githubusercontent.com/u/2124818?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jonathan Sundqvist</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=jonathan-s" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.rodloboz.com"><img src="https://avatars3.githubusercontent.com/u/23458442?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Rui Freitas</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=rodloboz" title="Documentation">📖</a></td>
    <td align="center"><a href="https://koudetat.co"><img src="https://avatars0.githubusercontent.com/u/7533706?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nicolas Filzi</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=nfilzi" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bdarcet"><img src="https://avatars1.githubusercontent.com/u/9220278?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Benjamin Darcet</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=bdarcet" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/juancarlosasensio"><img src="https://avatars3.githubusercontent.com/u/37816105?v=4?s=80" width="80px;" alt=""/><br /><sub><b>juancarlosasensio</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=juancarlosasensio" title="Documentation">📖</a></td>
    <td align="center"><a href="https://lidqqq.dev/"><img src="https://avatars3.githubusercontent.com/u/39523918?v=4?s=80" width="80px;" alt=""/><br /><sub><b>lidqqq</b></sub></a><br /><a href="#infra-lidqqq" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Alidqqq" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.julianrubisch.at"><img src="https://avatars0.githubusercontent.com/u/4352208?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Julian Rubisch</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=julianrubisch" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/pulls?q=is%3Apr+reviewed-by%3Ajulianrubisch" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/chalkygames123"><img src="https://avatars1.githubusercontent.com/u/5608239?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Takuya Fukuju</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=chalkygames123" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jcoyne"><img src="https://avatars2.githubusercontent.com/u/92044?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Justin Coyne</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=jcoyne" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.asgerbehnckejacobsen.dk"><img src="https://avatars3.githubusercontent.com/u/1920077?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Asger Behncke Jacobsen</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=asgerb" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dancallaghan"><img src="https://avatars1.githubusercontent.com/u/1025380?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dan Callaghan</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=dancallaghan" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://Konnor.site"><img src="https://avatars2.githubusercontent.com/u/26425882?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Konnor Rogers</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AParamagicDev" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=ParamagicDev" title="Code">💻</a></td>
    <td align="center"><a href="https://francisco.io/"><img src="https://avatars2.githubusercontent.com/u/2801252?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Francisco Presencia</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=franciscop" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/tsmd"><img src="https://avatars3.githubusercontent.com/u/490085?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Takayuki Shimada</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Atsmd" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Sub-Xaero"><img src="https://avatars0.githubusercontent.com/u/9960703?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dylan Clarke</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=Sub-Xaero" title="Code">💻</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=Sub-Xaero" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.howtoruby.com"><img src="https://avatars0.githubusercontent.com/u/1651750?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Martin Tomov</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=mtomov" title="Documentation">📖</a></td>
    <td align="center"><a href="https://symfonycasts.com"><img src="https://avatars.githubusercontent.com/u/121003?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ryan Weaver</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=weaverryan" title="Documentation">📖</a> <a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Aweaverryan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Intrepidd"><img src="https://avatars.githubusercontent.com/u/803765?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Adrien S</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AIntrepidd" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/FlxAlbroscheit"><img src="https://avatars.githubusercontent.com/u/2439195?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Felix Albroscheit</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3AFlxAlbroscheit" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://guillaumebriday.fr"><img src="https://avatars.githubusercontent.com/u/8252238?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Guillaume Briday</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/commits?author=guillaumebriday" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/craisp"><img src="https://avatars.githubusercontent.com/u/16748711?v=4?s=80" width="80px;" alt=""/><br /><sub><b>craisp</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Acraisp" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=craisp" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gahia"><img src="https://avatars.githubusercontent.com/u/8942202?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Gabriel</b></sub></a><br /><a href="https://github.com/stimulus-use/stimulus-use/issues?q=author%3Agahia" title="Bug reports">🐛</a> <a href="https://github.com/stimulus-use/stimulus-use/commits?author=gahia" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Acknowledgments

Continuous integration and cross browser testing is generously provided Sauce Labs.

[![Testing Powered By SauceLabs](https://opensource.saucelabs.com/images/opensauce/powered-by-saucelabs-badge-white.png?sanitize=true "Testing Powered By SauceLabs")](https://saucelabs.com)
