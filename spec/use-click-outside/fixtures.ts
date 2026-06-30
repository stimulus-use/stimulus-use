export const fixtureBase = `
  <div style="height: 10vh;" id="outside-1"></div>
  <div data-controller="modal" id="modal-1" data-action="modal:click:outside->modal#close click:outside->modal#close" data-id="1">
    <button style="height: 10vh;" id="inside-1"></button>
  </div>

  <div style="height: 120vh;"></div>
  <button id="outside-2"></button>
  <div data-controller="modal" data-action="modal:click:outside->modal#close" data-id="2">
    <button style="height: 10vh;" id="inside-2"></button>
  </div>
`

export const fixturePartiallyVisible = `
  <div style="height: 95vh;" id="outside-1"></div>
  <div data-controller="modal" id="modal-1" data-action="modal:click:outside->modal#close click:outside->modal#close" data-id="1">
    <button style="height: 10vh;" id="inside-1"></button>
  </div>

  <div style="height: 120vh;"></div>
  <button id="outside-2"></button>
  <div data-controller="modal" data-action="modal:click:outside->modal#close" data-id="2">
    <button style="height: 10vh;" id="inside-2"></button>
  </div>
`

export const fixtureCustomPrefix = `
  <div style="height: 10vh;" id="outside-1"></div>
  <div data-controller="modal" id="modal-1" data-action="custom:click:outside->modal#close" data-id="1">
    <button style="height: 10vh;" id="inside-1"></button>
  </div>

  <div style="height: 120vh;"></div>
  <button id="outside-2"></button>
  <div data-controller="modal" data-action="modal:click:outside->modal#close" data-id="2">
    <button style="height: 10vh;" id="inside-2"></button>
  </div>
`

export const fixtureWithoutPrefix = `
  <div style="height: 10vh;" id="outside-1"></div>
  <div data-controller="modal" id="modal-1" data-action="click:outside->modal#close" data-id="1">
    <button style="height: 10vh;" id="inside-1"></button>
  </div>

  <div style="height: 120vh;"></div>
  <button id="outside-2"></button>
  <div data-controller="modal" data-action="modal:click:outside->modal#close" data-id="2">
    <button style="height: 10vh;" id="inside-2"></button>
  </div>
`
