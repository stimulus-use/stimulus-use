## Observers

This set of mixins is built around the [`Observer APIs`](https://developer.mozilla.org/en-US/docs/Web/API) and custom events to enhance your controllers with new behaviors.

| Mixin| Description | NEW Callbacks |
|-----------------------|-------------|---------------------|
|[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecyle callback **clickOutside**.|`clickOutside`|
|[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
|[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
|[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
|[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecyle callback **resize**.|`resize`|
|[`useWindowResize`](./docs/use-window-resize.md)| Tracks the size of the `window` object and adds a new lifecyle callback **windowResize**.|`windowResize`|