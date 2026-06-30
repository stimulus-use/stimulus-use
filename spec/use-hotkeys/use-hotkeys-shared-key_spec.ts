import hotkeys from 'hotkeys-js'
import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, keyDown, keyUp, setFixture } from '../helpers'
import UseHotkeysSharedKeyController from './use_hotkeys_shared_key_controller'

const boundKeyCount = () => hotkeys.getAllKeyCodes().filter(registration => registration.shortcut === 'b').length

// https://github.com/stimulus-use/stimulus-use/issues/177
describe(`useHotkeys only unbinds the disconnecting controller's handler`, function () {
  let application
  let testLogger

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    setFixture(`
      <div data-controller="hotkeys-shared" id="first"></div>
      <div data-controller="hotkeys-shared" id="second"></div>
    `)

    application.register('hotkeys-shared', UseHotkeysSharedKeyController)

    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('keeps the remaining controller bound after another disconnects', async function () {
    keyDown('#first', { key: 'b', keyCode: 66, which: 66 })
    keyDown('#second', { key: 'b', keyCode: 66, which: 66 })

    expect(testLogger.eventsFilter({ name: ['handle'], id: ['first'] }).length).to.equal(1)
    expect(testLogger.eventsFilter({ name: ['handle'], id: ['second'] }).length).to.equal(1)

    testLogger.clear()
    const boundBefore = boundKeyCount()
    document.querySelector('#first').remove()

    await nextFrame()
    await delay()

    expect(boundKeyCount()).to.equal(boundBefore - 1)

    keyDown('#second', { key: 'b', keyCode: 66, which: 66 })
    keyUp('#second', { key: 'b', keyCode: 66, which: 66 })

    expect(testLogger.eventsFilter({ name: ['handle'], id: ['second'] }).length).to.equal(1)
    expect(testLogger.eventsFilter({ name: ['handle'], id: ['first'] }).length).to.equal(0)
  })
})
