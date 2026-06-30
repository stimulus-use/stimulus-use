# Events

Some `stimulus-use` modules will add new events. Events typically mirror the behavior they add to the controller.

Here is a list of all additional events:

All event names below are shown **without** their prefix. By default they are prefixed with the controller identifier (see [Event Prefix](#event-prefix)).

| Event |Module | Description | `event.detail` |
|-------|-------|-------------|----------------|
|`appear`|[`useIntersection`](./use-intersection.md)| Triggered whenever the controller element appears within the viewport. | `{ entry, controller }` |
|`away`|[`useIdle`](./use-idle.md)| Triggered whenever the user becomes idle on the page. | `{ controller, originalEvent }` |
|`back`|[`useIdle`](./use-idle.md)| Triggered whenever the user returns from an idle state. | `{ controller, originalEvent }` |
|`click:outside`|[`useClickOutside`](./use-click-outside.md)| Triggered whenever the user clicks outside of the controller element. | `{ controller, originalEvent }` |
|`disappear`|[`useIntersection`](./use-intersection.md)| Triggered whenever the controller element disappears from the viewport. | `{ entry, controller }` |
|`focus`|[`useWindowFocus`](./use-window-focus.md)| Triggered whenever the window becomes focused. | `{ event, hasFocus }` |
|`invisible`|[`useVisibility`](./use-visibility.md)| Triggered whenever the page visibility changes and the browser tab becomes invisible. | `{ event, isVisible }` |
|`mouseEnter`|[`useHover`](./use-hover.md)| Triggered whenever the mouse enters the controller element. | `{ hover }` |
|`mouseLeave`|[`useHover`](./use-hover.md)| Triggered whenever the mouse leaves the controller element. | `{ hover }` |
|`mutate`|[`useMutation`](./use-mutation.md)| Triggered whenever the observed mutations occur. | `{ entries }` |
|`resize`|[`useResize`](./use-resize.md)| Triggered whenever the observed element is resized. | `{ entry, controller }` |
|`unfocus`|[`useWindowFocus`](./use-window-focus.md)| Triggered whenever the window loses focus. | `{ event, hasFocus }` |
|`visible`|[`useVisibility`](./use-visibility.md)| Triggered whenever the page visibility changes and the browser tab becomes visible. | `{ event, isVisible }` |
|`[name]:changed` / `is:[name]` / `not:[name]`|[`useMatchMedia`](./use-match-media.md)| Triggered whenever a tracked media query changes / matches / stops matching. `[name]` is the key of the media query. | `{ name, media, matches, event }` |

## Event Prefix

With the module options you can specify the event prefix. By default all module will emit events **with the controller identifier as a prefix.**

The `eventPrefix` option can be a **boolean** or a **string**.

```js
// card_controller.js
export default class extends Controller {
  options = {
    eventPrefix: true,
  }

  connect() {
    useIntersection(this, this.options)
  }
}
```

Example for `eventPrefix` values:
- `true` -> `card:appear`
- `false` -> `appear`
- `"my-prefix"` -> `my-prefix:appear`

## Accessing source controller and details
The controller and the original event are provided within the details object of the event.

```js
// get the emitting controller and original event for a click:outside event
const { controller, originalEvent } = event.detail
```

```js
// get the emitting controller and entry object for an appear event
const { controller, entry } = event.detail
```
