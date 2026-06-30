import { Application } from '@hotwired/stimulus'
import hotkeys from 'hotkeys-js'
import { nextFrame, TestLogger, keyDown, keyUp, setFixture } from '../helpers'
import UseHotkeysSimpleFilterController, { simpleFormFilter } from './use_hotkeys_simple_filter_controller'

// https://github.com/stimulus-use/stimulus-use/issues/191
describe(`useHotkeys filter option in the simple form`, function () {
  let application
  let testLogger

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    setFixture(`<div data-controller="hotkeys-simple-filter"></div>`)
    application.register('hotkeys-simple-filter', UseHotkeysSimpleFilterController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('applies the filter option instead of treating it as a hotkey', function () {
    expect(hotkeys.filter).to.equal(simpleFormFilter)
  })

  it('still binds the actual hotkey', async function () {
    keyDown('body', { key: 'b', keyCode: 66, which: 66 })
    keyUp('body', { key: 'b', keyCode: 66, which: 66 })

    expect(testLogger.eventsFilter({ name: ['bHandler'] }).length).to.equal(1)
  })
})
