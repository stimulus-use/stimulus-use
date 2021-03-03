export const fixtureBase = `
  <div data-controller="transition" data-action="click->transition#toggle" id="transitionable-element"
        data-transition-enter="transition ease-out duration-300"
        data-transition-enter-active="transform opacity-0 scale-95"
        data-transition-enter-to="transform opacity-100 scale-100"
        data-transition-leave="transition ease-in duration-300"
        data-transition-leave-active="transform opacity-100 scale-100"
        data-transition-leave-to="transform opacity-0 scale-95" >
    <div>Content</div>
  </div>
`
