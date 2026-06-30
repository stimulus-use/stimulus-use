import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, setFixture } from '../helpers'
import UseResizeController from './use_resize_controller'

// https://github.com/stimulus-use/stimulus-use/issues/181
describe(`useResize does not trigger the "ResizeObserver loop" warning`, function () {
  let application
  let testLogger
  let resizeLoopErrors
  let onError

  beforeAll(async function () {
    resizeLoopErrors = []
    onError = (event: ErrorEvent) => {
      if (typeof event.message === 'string' && event.message.includes('ResizeObserver loop')) {
        resizeLoopErrors.push(event.message)
        event.preventDefault()
      }
    }
    window.addEventListener('error', onError)

    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    setFixture(`<div data-controller="resize" id="box" style="width: 100px"></div>`)
    application.register('resize', UseResizeController)

    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
    window.removeEventListener('error', onError)
  })

  it('calls the resize callback without emitting the loop warning', async function () {
    const box = document.querySelector('#box') as HTMLElement
    for (let i = 0; i < 5; i++) {
      box.style.width = `${120 + i * 20}px`
      await nextFrame()
      await delay()
    }

    await delay(50)

    expect(testLogger.eventsFilter({ name: ['resize'] }).length).to.be.greaterThan(0)
    expect(resizeLoopErrors.length).to.equal(0)
  })
})
