import { Application } from '@hotwired/stimulus'
import hotkeys from 'hotkeys-js'
import { nextFrame, TestLogger, keyDown, keyUp, setFixture } from '../helpers'

import UseHotkeysSimpleFilterController, {
  UseHotkeysBlockingFilterController,
  simpleFormFilter,
  blockingFilter
} from './use_hotkeys_simple_filter_controller'

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

  beforeEach(function () {
    testLogger.clear()
  })

  it('applies the filter option instead of treating it as a hotkey', function () {
    expect(hotkeys.filter).to.equal(simpleFormFilter)
  })

  it('still binds the actual hotkey', async function () {
    keyDown('body', { key: 'b', keyCode: 66, which: 66 })
    keyUp('body', { key: 'b', keyCode: 66, which: 66 })

    expect(testLogger.eventsFilter({ name: ['bHandler'] }).length).to.equal(1)
  })

  it('binds every hotkey defined alongside the filter', async function () {
    keyDown('body', { key: 'b', keyCode: 66, which: 66 })
    keyUp('body', { key: 'b', keyCode: 66, which: 66 })
    keyDown('body', { key: '/', keyCode: 191, which: 191 })
    keyUp('body', { key: '/', keyCode: 191, which: 191 })

    expect(testLogger.eventsFilter({ name: ['bHandler'] }).length).to.equal(1)
    expect(testLogger.eventsFilter({ name: ['slashHandler'] }).length).to.equal(1)
  })
})

describe(`useHotkeys filter option is consulted at runtime`, function () {
  let application
  let testLogger
  let originalFilter

  beforeAll(async function () {
    originalFilter = hotkeys.filter

    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    setFixture(`<div data-controller="hotkeys-blocking-filter"></div>`)
    application.register('hotkeys-blocking-filter', UseHotkeysBlockingFilterController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
    hotkeys.filter = originalFilter
  })

  it('does not fire the hotkey when the filter returns false', async function () {
    expect(hotkeys.filter).to.equal(blockingFilter)

    keyDown('body', { key: 'b', keyCode: 66, which: 66 })
    keyUp('body', { key: 'b', keyCode: 66, which: 66 })

    expect(testLogger.eventsFilter({ name: ['blockedHandler'] }).length).to.equal(0)
  })
})
