# Events

Some `stimulus-use` modules will add new events. Events typically mirror the behavior they add to the controller.

Here is a list of all additional events:

| Event |Module | Description |
|-------|-------|-------------|
|`appear`|[`useIntersection`](./docs/use-intersection.md)| New event being triggered whenever the controller element appears. the detail contains the `entry` object and the controller|
|`away`|[`useIdle`](./docs/use-idle.md)| New event being triggered whenever the user is idle on the page. |
|`back`|[`useIdle`](./docs/use-idle.md)| New event being triggered whenever the user returns back from an idle state. |
|`click:outside`|[`useClickOutside`](./docs/use-click-outside.md)| New event being triggered whenever the user clicks outside of the controller element|
|`disappear`|[`useIntersection`](./docs/use-intersection.md)| New event being triggered whenever the controller element disappears. the detail contains the `entry` object and the controller|
|`invisible`|[`useVisibility`](./docs/use-visibility.md)| New event being triggered whenever the page visibility change and the browser tab becomes invisible|
|`visible`|[`useVisibility`](./docs/use-visibility.md)| New event being triggered whenever the page visibility change and the browser tab becomes visible|

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
- true -> `card:appear`
- false -> `appear`
- "my-prefix" -> `my-prefix:appear`

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
