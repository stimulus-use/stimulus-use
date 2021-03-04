# useTransition (this is currently in beta version)

Mixin/controller to apply to apply transition effects when items are inserted, updated, or removed from the DOM (largely inspired by the Vue, AlpineJS & Tailwind world).

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
|`enter`| Starting state for enter. Added before element is inserted, removed one frame after element is inserted. | |
|`enterActive`| Active state for enter. Applied during the entire entering phase. Added before element is inserted, removed when transition/animation finishes. This class can be used to define the duration, delay and easing curve for the entering transition.||
|`enterTo`| Ending state for enter. Added one frame after element is inserted (at the same time `enter` is removed), removed when transition/animation finishes.||
|`leave`| Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.||
|`leaveActive`| Active state for leave. Applied during the entire leaving phase. Added immediately when leave transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.||
|`leaveTo`| Ending state for leave. Added one frame after a leaving transition is triggered (at the same time `leave` is removed), removed when the transition/animation finishes.||
|`hiddenClass`| conditionnaly add a hidden class after `leave`, default is `hidden`, Set it to `false` to ignore it  |`hidden`|
|`preserveOriginalClass`| Boolean value whether to preserve original class if some classes from the transition overlap with the initial classes of the the element.|`true`|
|`removeToClasses`| Boolean value whether to remove the `To` classsed (`enterTo`, `leaveTo`) at the end of the transition|`true`|

## Dirtectives

Both Vue JS naming and Alpine are supported

#### Vue JS directive style

```html
data-transition-enter="transform opacity-0 scale-95"
data-transition-enter-active="transition ease-out duration-300"
data-transition-enter-to="transform opacity-100 scale-100"
data-transition-leave="transform opacity-100 scale-100"
data-transition-leave-active="transition ease-in duration-300"
data-transition-leave-to="transform opacity-0 scale-95"
```

#### Alpine JS directive style

````html
data-transition-enter-class="transform opacity-0 scale-95"
data-transition-enter-start-class="transition ease-out duration-300"
data-transition-enter-end-class="transform opacity-100 scale-100"
data-transition-leave-class="transform opacity-100 scale-100"
data-transition-leave-start-class="transition ease-in duration-300"
data-transition-leave-end-class="transform opacity-0 scale-95"
```

**Example :**

Here is a typical dropdown component from tailwind.

```html
<div class="relative"
     data-controller="transition click-outside"
     data-transition-target="content"
     data-action="click-outside:click:ouside->">
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
  data-transition-enter="transform opacity-0 scale-95"
  data-transition-enter-active="transition ease-out duration-300"
  data-transition-enter-to="transform opacity-100 scale-100"
  data-transition-leave="transform opacity-100 scale-100"
  data-transition-leave-active="transition ease-in duration-300"
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
