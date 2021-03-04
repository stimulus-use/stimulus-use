export const fixtureBase = `
  <div data-controller="transition" data-action="click->transition#toggleTransition" id="transitionable-element"
        data-transition-enter-active="enter-active-class"
        data-transition-enter-from="enter-from-class"
        data-transition-enter-to="enter-to-class"
        data-transition-leave-active="leave-active-class"
        data-transition-leave-from="leave-from-class"
        data-transition-leave-to="leave-to-class"
        class="hidden"
        style="transition-duration: 30ms" >
    <div>Content</div>
  </div>
`
