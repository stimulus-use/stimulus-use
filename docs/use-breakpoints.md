# useBreakpoints

Adds new behaviors to your Stimulus controller when the breakpoint changes or when a specific breakpoint is active.

## Reference

#### Mixin

```js
useBreakpoints(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `breakpoints` | The definition of your breakpoints. |  `Breakpoints.default` |
| `callbackPrefix` | The prefix name of the breakpoint callback function to be called when a specific breakpoints is active | `breakpoint` |
| `changedCallbackName` | The name of the function to be called when a breakpoint changes. | `breakpointChanged` |
| `callbackName` | This function defines how your callback functions are named. The function takes two arguments: `(prefix, currentBreakpoint)` | `(prefix, breakpoint) => return prefix + breakpoint.toUpperCase()` |
| `minWidth` | Whether to evaluate the current breakpoint with min-value or not. For max-width pass in `false` | `true` |
| `dispatchEvent` | Whether to dispatch `breakpoint:changed` and `breakpoint:<breakpoint>` events on `element` or not. | `true` |
| `element` | The element the event will be emitted on. | The controller element |
| `eventPrefix` | Whether to prefix the emitted event or not. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `item:add` <br>- **someString** prefix the event with the given string `someString:add` <br>- **false** to remove prefix  | `breakpoint`|
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools| `false`|


## Usage

```js
// breakpoints_controller.js

import { Controller } from 'stimulus'
import { useBreakpoints } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useBreakpoints(this)
  }

  // gets called whenever the breakpoint changes
  breakpointChanged({ breakpoint, width }) {
    console.log(`current breakpoint: ${breakpoint} with ${width}px`)
  }

  // gets called whenever the current breakpoint changes to sm
  breakpointSM({ width }) {
    // ...
  }

  // gets called whenever the current breakpoint changes to xl
  breakpointXL({ width }) {
    // ...
  }
}
```


## The `breakpoints` option

The `breakpoints` option is used to configure the breakpoints in your app. `stimulus-use` defines some default breakpoints for you, so you don't need to configure all the breakpoints yourself.

Currently there are three exports available:

* `Breakpoints.default` (which is Bootstrap)
* `Breakpoints.bootstrap`
* `Breakpoints.tailwind`.

All values are declared in the `px` unit.

You can pass in the different options as such:

```js
// ...
import { Breakpoints } from 'stimulus-use'
// ...

export default class extends Controller {
  connect() {
    useBreakpoints(this) // <-- implict
    useBreakpoints(this, { breakpoints: Breakpoints.default }) // <-- equivalent to this
    // or
    useBreakpoints(this, { breakpoints: Breakpoints.bootstrap })
    // or
    useBreakpoints(this, { breakpoints: Breakpoints.tailwind })
  }

  // ...
}
```

You can also extend the defaults with your own breakpoints:

```js
useBreakpoints(this, { breakpoints: { ...Breakpoints.boostrap, 'xxxl': 2560 } })
```


Or you can define the breakpoints on your own:


```js
useBreakpoints(this, {
  breakpoints: {
    'xs': 0,
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400
  }
})
```

If you like to override the default breakpoints globally you can do so:

```js
import { Breakpoints } from 'stimulus-use'

Breakpoints.default = {
  'sm': 576,
  'lg': 992,
  'xxl': 1400
}
```

Every `useBreakpoints(this)` call now uses the default breakpoints specified above if nothing else is specified via arguments.


## Emitting events

By default the `useBreakpoints()` mixin emits events for every breakpoint change or whenever a specify breakpoint is active. This can be useful if you want to annotate some behaviour in your HTML markup which is depended on the current breakpoint.

Set `dispatchEvent` to `false` if you don't want to emit events.

### Events for the default breakpoints

If you use the default breakpoints the following events get emitted on the `element` and will bubble up the DOM tree:

* `breakpoint:changed`
* `breakpoint:xs`
* `breakpoint:sm`
* `breakpoint:md`
* `breakpoint:lg`
* `breakpoint:xl`
* `breakpoint:xxl`

### Eventname for custom breakpoints

The breakpoint in the event name is always lowercased. If you define a `2XL` breakpoint the event name will be `breakpoint:2xl`.

### The `eventPrefix` option

You can also prefix the event names by specifying the `eventPrefix` option:


| Option | Value | Event name (for the breakpoint `lg`) |
|--------|-------|---------|
| Default (implicit) | `'breakpoint'` | `breakpoint:lg` |
| Boolean | `true` | `breakpoints:lg` |
| Boolean | `false` | `lg` |
| Custom String | `'layout'` | `layout:lg` |

### Listening for events

The emitted event will bubble up the DOM tree. Therefore all parent elements can listen to it directly.

```html
<nav data-controller="navigation" data-action="breakpoint:sm->navigation#animateOut">
  <div data-controller="breakpoints"></div>
</nav>
```

If both controllers at the on level or even nested within the controller, you should listen to event with `@window` to catch it.

```html
<body data-controller="breakpoints">
  <nav
    data-controller="navigation"
    data-action="breakpoint:changed@window->navigation#adapt">
  </nav>

  <aside
    data-controller="sidebar"
    data-action="breakpoint:sm@window->sidebar#animateOut breakpoint:md->sidebar#animateIn">
  </aside>
</body>
```


## Controller Callbacks

The `useBreakpoints()` mixin will call the corresponding callback function in the Stimulus controller whenever the breakpoint changes or a specific breakpoint is active. The callback function names are determined by the string `breakpoint` and the breakpoint name uppercased.

For the default breakpoints this will looks as follows:

| Breakpoint | Controller Function |
|------------|-------|
| `xs` | `breakpointXS()` |
| `sm` | `breakpointSM()` |
| `md` | `breakpointMD()` |
| `lg` | `breakpointLG()` |
| `xl` | `breakpointXL()` |
| `xxl` | `breakpointXXL()` |

If you change the `callbackPrefix` option to `layout` the callback function need to be named as follows:

| Breakpoint | Controller Function |
|------------|-------|
| `xs` | `layoutXS()` |
| `sm` | `layoutSM()` |
| `md` | `layoutMD()` |
| `lg` | `layoutLG()` |
| `xl` | `layoutXL()` |
| `xxl` | `layoutXXL()` |


### Custom callback names

If you want to change the names of the callbacks to something completly different you can do so so by passing a function for the `callbackNames` option. This option takes a function with two arguments. The first argument is the prefix and the second argument is the current breakpoint.

#### Example

You could map the breakpoints to device types:

```js
useBreakpoints(this, {
  callbackNames: (_prefix, breakpoint) => {
    return switch (breakpoint) {
      case 'xs': 'phone'
      case 'sm': 'tablet'
      case 'md': 'tablet'
      case 'lg': 'laptop'
      case 'xl': 'desktop'
      case 'xxl': 'desktop'
    }
  }
})
```

With this config the following callback functions would be called on the controller:

| Breakpoint | Controller Function |
|------------|-------|
| `xs` | `phone()` |
| `sm` | `tablet()` |
| `md` | `tablet()` |
| `lg` | `laptop()` |
| `xl` | `desktop()` |
| `xxl` | `desktop()` |
