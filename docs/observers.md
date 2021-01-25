## Observers

This set of mixins is built around the [`Observer APIs`](https://developer.mozilla.org/en-US/docs/Web/API) and custom events to enhance your controllers with new behaviors.

| Mixin| Description | NEW Callbacks |
|-----------------------|-------------|---------------------|
|[`useClickOutside`](./docs/use-click-outside.md)|Tracks the clicks outside of the element and adds a new lifecycle callback **clickOutside**.|`clickOutside`|
|[`useHover`](./docs/use-hover.md)|Tracks the user's mouse movements over an element and adds **mouseEnter** and **mouseLeave** callbacks to your controller.|`mouseEnter` `mouseLeave`|
|[`useIdle`](./docs/use-idle.md)| Tracks if the user is idle on your page and adds **away** and **back** callbacks to your controller.|`away`</br> `back`|
|[`useIntersection`](./docs/use-intersection.md) | Tracks the element's intersection and adds **appear**, **disappear** callbacks to your controller.|`appear`</br> `disappear`|
|[`useMutation`](./docs/use-mutation.md) | Tracks mutations on an element, its attributes and/or subtree. Adds a **mutate** callback to your controller.|`mutate`|
|[`useResize`](./docs/use-resize.md)|Tracks the element's size and adds a new lifecycle callback **resize**.|`resize`|
|[`useTargetMutation`](use-target-mutation.md) | Tracks when targets are added or removed from the controller's scope, or their contents changed. Adds **[target]TargetAdded** , **[target]TargetRemoved** and **[target]TargetChanged** callback to your controller for each specified target.| `[target]TargetAdded` `[target]TargetRemoved` `[target]TargetChanged`|
|[`useVisibility`](./docs/use-visibility.md) </br>| Tracks the page visibility and adds **visible**, **invisible** callbacks to your controller.|`visible`</br> `invisible`|
|[`useWindowResize`](./docs/use-window-resize.md)| Tracks the size of the `window` object and adds a new lifecycle callback **windowResize**.|`windowResize`|
