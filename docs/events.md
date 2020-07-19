# Events

Some `Stimulus-use` module will add new events. Events typically mirroring the new behavior they add to the controller.

Here is the list of additional events availables

| Event |Module | Description |
|-------|-------|-------------|
|`click:outside`|[`useClickOutside`](./docs/use-click-outside.md)| New event being triggered whenever the user clicks outside of the controller element|

## Accessing source controller

The event is emitted from the controller element and includes the emitting controller.

```js
// get the emitting controller
const { controller } = event
```


