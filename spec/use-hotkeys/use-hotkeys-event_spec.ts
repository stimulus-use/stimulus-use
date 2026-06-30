import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, keyDown, keyUp, setFixture } from '../helpers'
import UseHotkeysEventController from './use_hotkeys_event_controller'

// https://github.com/stimulus-use/stimulus-use/issues/201
describe(`useHotkeys passes the HotkeysEvent as the second handler argument`, function () {
  let application
  let testLogger

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    setFixture(`<div data-controller="hotkeys-event"></div>`)
    application.register('hotkeys-event', UseHotkeysEventController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('invokes the handler with (KeyboardEvent, HotkeysEvent)', async function () {
    keyDown('body', { key: 'x', keyCode: 88, which: 88 })
    keyUp('body', { key: 'x', keyCode: 88, which: 88 })

    const events = testLogger.eventsFilter({ name: ['recordHandler'] })
    expect(events.length).to.equal(1)

    const [event] = events
    expect(event.firstIsKeyboardEvent).to.equal(true)
    expect(event.secondIsKeyboardEvent).to.equal(false)
    expect(event.shortcut).to.equal('x')
    expect(event.scope).to.equal('all')
  })
})
