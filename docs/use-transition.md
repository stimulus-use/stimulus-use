# useTransition (this is currently in beta version)

Mixin/controller to apply transition effects when items are inserted, updated, or removed from the DOM (largely inspired by the Vue, AlpineJS & Tailwind world).

Transition is available both as a mixin to add transition behavior to your controller or as a standard controller to use with data attributes when you don't need additional customization.

**Beta version subject to breaking changes. If you plan to use it register to the Github releases.**

## Mixin Reference

```javascript
useTransition(controller, options = {})
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |Default value|
|-----------------------|-------------|---------------------|
| `element` | The element to transition| The controller element|
|`enterActive`| Active state for enter. Applied during the entire entering phase. Added before element is inserted, removed when transition/animation finishes. This class can be used to define the duration, delay and easing curve for the entering transition.||
|`enterFrom`| Starting state for enter. Added before element is inserted, removed one frame after element is inserted. | |
|`enterTo`| Ending state for enter. Added one frame after element is inserted (at the same time `enterFrom` is removed), removed when transition/animation finishes.||
|`leaveActive`| Active state for leave. Applied during the entire leaving phase. Added immediately when leave transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.||
|`leaveFrom`| Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.||
|`leaveTo`| Ending state for leave. Added one frame after a leaving transition is triggered (at the same time `leaveFrom` is removed), removed when the transition/animation finishes.||
|`hiddenClass`| Conditionally add a hidden class after `leave`, default is `hidden`, Set it to `false` to ignore it  |`hidden`|
|`preserveOriginalClass`| Boolean value whether to preserve original class, if some classes from the transition overlap with the initial classes of the element.|`true`|
|`removeToClasses`| Boolean value whether to remove the `To` classsed (`enterTo`, `leaveTo`) at the end of the transition|`true`|
|`transitioned`| whether the element has transitioned or not. Useful to set a default transtion state if your element starts with an `enter` state|`false`|

## Directives

Both Vue JS naming and Alpine are supported (these examples show classes from Tailwind, like `transition` and `ease-out` where no custom CSS is needed).

#### Vue JS directive style

```html
data-transition-enter-active="transition ease-out duration-300"
data-transition-enter-from="transform opacity-0 scale-95"
data-transition-enter-to="transform opacity-100 scale-100"
data-transition-leave-active="transition ease-in duration-300"
data-transition-leave-from="transform opacity-100 scale-100"
data-transition-leave-to="transform opacity-0 scale-95"
```

#### Alpine JS directive style

```html
data-transition-enter-class="transform opacity-0 scale-95"
data-transition-enter-start-class="transition ease-out duration-300"
data-transition-enter-end-class="transform opacity-100 scale-100"
data-transition-leave-class="transform opacity-100 scale-100"
data-transition-leave-start-class="transition ease-in duration-300"
data-transition-leave-end-class="transform opacity-0 scale-95"
```

**Example :**

Here is a typical dropdown component from Tailwind.

```html
<div class="relative"
     data-controller="transition click-outside"
     data-transition-target="content"
     data-action="click-outside:click:outside->transition#leave">
  <div>
    <button
      data-action="click->dropdown#toggle"
      type="button"
      class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Dropdown
    </button>
  </div>
  <div class="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
  data-target="dropdown.content"
  data-transition-enter-active="transition ease-out duration-300"
  data-transition-enter-from="transform opacity-0 scale-95"
  data-transition-enter-to="transform opacity-100 scale-100"
  data-transition-leave-active="transition ease-in duration-300"
  data-transition-leave-from="transform opacity-100 scale-100"
  data-transition-leave-to="transform opacity-0 scale-95"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="user-menu">
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
  </div>
</div>
```

**Example in a Controller without Tailwind :**

If you're not using Tailwind, you'll need to create custom CSS classes. Here's an example that also uses the mixin style:

```html
<div data-controller="custom-close">
    <div data-custom-close-target="boxToClose">
        This element will fade out and in!
    </div>

    <button data-action="custom-close#close">Close Box</button>
    <button data-action="custom-close#open">Open Box</button>
    <button data-action="custom-close#toggle">Toggle Box</button>
</div>
```

The controller for `custom-close`:

```js
import { Controller } from '@hotwired/stimulus';
import { useTransition } from 'stimulus-use';

export default class extends Controller {
    static targets = ['boxToClose']

    connect() {
        useTransition(this, {
            element: this.boxToCloseTarget,
            enterActive: 'fade-enter-active',
            enterFrom: 'fade-enter-from',
            enterTo: 'fade-enter-to',
            leaveActive: 'fade-leave-active',
            leaveFrom: 'fade-leave-from',
            leaveTo: 'fade-leave-to',
            hiddenClass: 'd-none',
            // set this, because the item *starts* in an open state
            transitioned: true,
        });
    }

    close() {
        this.leave();
    }

    open() {
        this.enter();
    }

    toggle() {
        this.toggleTransition();
    }
}
```

Finally, you'll need custom CSS to add your transition behavior. This will cause a fade in and fade out behavior that lasts 500 milliseconds:

```css
.fade-enter-active, .fade-leave-active {
    transition: opacity 500ms;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
.d-none {
    display: none;
}
```
