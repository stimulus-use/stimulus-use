<p align="center">
  <img src="assets/stimulus-use-logo.png" width="500" srcset="assets/stimulus-use-logo@2x.png 2x, assets/stimulus-use-logo@3x.png 3x" />
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
</p>

<br />

- **New lifecycle behaviors**: adds new standard behaviors to your Stimulus controllers.
- **Composable**: compose at will different behaviors in a single controller.
- **Modular**: built as ES6 modules, just import what you need and tree shaking will remove the rest.
- **Typscript**: Types available, better autocompletion.
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

  | Mixin| Description | NEW Callbacks |
  |-----------------------|-------------|---------------------|
  |[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecyle callback **clickOutside**.|`clickOutside`|
  |[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
  |[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
  |[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
  |[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecyle callback **resize**.|`resize`|
  |[`useWindowSize`](./docs/use-window-size.md)| Tracks the size of the `window` object and adds a new lifecyle callback **windowResize**.|`windowResize`|

- **Optimization**

A set of mixin to optimize performances.

| Mixin| Description |
|------|-------------|
|[`useDebounce`](./docs/use-debounce.md)|adds the ability to pecify an array "debouces" of function to debounce.|
|[`useMemo`](./docs/use-memo.md)|memoize expensive getters by mixing in `useMemo` and adding a static `memos` array.|
|[`useThrottle`](./docs/use-throttle.md)|adds the ability to specify an array "throttles" of functions to throttle.|

- **Application**
  - [`useApplication, ApplicationController`](./docs/application-controller.md) &mdash; supercharged controller for your application.


## Extend or compose

Stimulus-use can be used in two manners: extending or composing

**Extending**

You can create your stimulus from a pre-build Stimulus-use controller that offers the new behavior you are looking for. This method is perfectly suited when you only need a single behavior for your controller

```js
import { IntersectionController } from 'stimulus-use'

export default class extends IntersectionController {
  appear(entry) {
    // triggered when the element appears within the viewport
  }
}
```

**Composing**

When you need multiple behaviors or you are already extending your controller from another one. You can easily add new behavior with the `use` functions.

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
