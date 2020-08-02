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

  Sets of controllers arround the `Observer APIs`
  | useFunction/Controller| Description | NEW Callbacks |
  |-----------------------|-------------|---------------------|
  | [`useIntersection`](./docs/use-intersection.md) </br> `IntersectionController` | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
  |[`useResize`](./docs/use-resize.md) </br>`ResizeController`|Tracks the element's size and adds a new lifecyle callback **resized**.|`resized`|

- **Application**
  - [`useApplication, ApplicationController`](./docs/application-controller.md) &mdash; supercharged controller for your application.


- **Idle**
  - [`useIdle, IdleController`](./docs/use-idle.md) &mdash;  Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.

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

  resized({ height, width }) {
    // trigered when the element is resized
  }
}
```
