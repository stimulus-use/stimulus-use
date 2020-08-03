# Events

Some `Stimulus-use` module will add new events. Events typically mirroring the new behavior they add to the controller.

Here is the list of additional events availables

| Event |Module | Description |
|-------|-------|-------------|
|`click:outside`|[`useClickOutside`](./docs/use-click-outside.md)| New event being triggered whenever the user clicks outside of the controller element|

## Accessing source controller & original event
The controller and the original event are provided within the details object of the event.

```js
// get the emitting controller and original event
const { controller, originalEvent } = event.detail
```


