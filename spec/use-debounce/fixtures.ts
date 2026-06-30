export const fixtureBase = `
  <div data-controller="debounce">
    <div id="debounced" data-action="click->debounce#a click->debounce#b click->debounce#c click->debounce#d"></div>
  </div>
`

export const sameEventMultipleActions = `
  <div data-controller="debounce" data-action="click@window->debounce#b">
    <button id="debounced" data-debounce-some-id-param="123" data-action="click->debounce#a">Click me</button>
  </div>
`
