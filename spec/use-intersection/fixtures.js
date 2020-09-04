export const fixtureBase = `
  <a href="#2" id="scroll-down">Scroll down<a/>
  <div data-controller="intersection" data-action="intersection:appear->intersection#logAction" data-id="1" id="controller-1" style="height: 70vh;"></div>
  <div style="height: 110vh;"></div>
  <div data-controller="intersection" data-id="2" id="2"></div>
  <a href="#scroll-down" id="scroll-top">Scroll top<a/>
`

export const fixtureCustomPrefix = `
  <a href="#2" id="scroll-down">Scroll down<a/>
  <div style="height: 10vh;" id="spacer"></div>
  <div data-controller="intersection" data-action="custom:appear->intersection#logAction" data-id="1" id="controller-1"></div>
  <div style="height: 110vh;"></div>
  <div data-controller="intersection" data-id="2" id="2"></div>
  <div style="height: 100vh;" id="spacer"></div>
  <a href="#scroll-down" id="scroll-top">Scroll top<a/>
`

export const fixtureWithoutPrefix = `
  <a href="#2" id="scroll-down">Scroll down<a/>
  <div style="height: 10vh;" id="spacer"></div>
  <div data-controller="intersection" data-action="appear->intersection#logAction" data-id="1" id="controller-1"></div>
  <div style="height: 110vh;"></div>
  <div data-controller="intersection" data-id="2" id="2"></div>
  <div style="height: 100vh;" id="spacer"></div>
  <a href="#scroll-down" id="scroll-top">Scroll top<a/>
`
