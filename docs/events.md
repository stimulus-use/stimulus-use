# Events

Some `Stimulus-use` module will add new events. Events typically mirroring the new behavior they add to the controller.

Here is the list of additional events availables

| Event |Module | Description |
|-------|-------|-------------|
|`appear`|[`useIntersection`](./docs/use-intersection.md)| New event being triggered whenever the controller element appears. the detail contains the `entry` object and the controller|
|`click:outside`|[`useClickOutside`](./docs/use-click-outside.md)| New event being triggered whenever the user clicks outside of the controller element|
|`disappear`|[`useIntersection`](./docs/use-intersection.md)| New event being triggered whenever the controller element disappears. the detail contains the `entry` object and the controller|

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


