import hotkeys from 'hotkeys-js'
import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, keyDown, keyUp, setFixture } from '../helpers'

import {
  UseHotkeysMultiKeyController,
  UseHotkeysScopedController,
  UseHotkeysReconnectController
} from './use_hotkeys_unbind_controllers'

const registrations = (predicate: (registration: any) => boolean) => hotkeys.getAllKeyCodes().filter(predicate)

// https://github.com/stimulus-use/stimulus-use/issues/177
describe(`useHotkeys unbind — broader coverage`, function () {
  describe('a controller binding multiple keys', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`
        <div data-controller="hotkeys-multi" id="multi"></div>
        <div data-controller="hotkeys-shared-multi" id="other"></div>
      `)

      application.register('hotkeys-multi', UseHotkeysMultiKeyController)
      application.register('hotkeys-shared-multi', UseHotkeysMultiKeyController)

      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('unbinds all of its own keys on disconnect, leaving another controller intact', async function () {
      expect(registrations(r => r.shortcut === 'b').length).to.equal(2)
      expect(registrations(r => r.shortcut === '/').length).to.equal(2)

      document.querySelector('#multi').remove()
      await nextFrame()
      await delay()

      expect(registrations(r => r.shortcut === 'b').length).to.equal(1)
      expect(registrations(r => r.shortcut === '/').length).to.equal(1)

      keyDown('#other', { key: 'b', keyCode: 66, which: 66 })
      keyUp('#other', { key: 'b', keyCode: 66, which: 66 })
      keyDown('#other', { key: '/', keyCode: 191, which: 191 })
      keyUp('#other', { key: '/', keyCode: 191, which: 191 })

      expect(testLogger.eventsFilter({ name: ['multi'], id: ['other'] }).length).to.equal(2)
    })
  })

  describe('a controller binding a scoped key', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`<div data-controller="hotkeys-scoped" id="scoped"></div>`)
      application.register('hotkeys-scoped', UseHotkeysScopedController)
      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('unbinds the binding under its own scope', async function () {
      expect(registrations(r => r.shortcut === 'm' && r.scope === 'files').length).to.equal(1)

      document.querySelector('#scoped').remove()
      await nextFrame()
      await delay()

      expect(registrations(r => r.shortcut === 'm' && r.scope === 'files').length).to.equal(0)
    })
  })

  describe('a controller that reconnects', function () {
    let application
    let testLogger
    let fixture

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      fixture = setFixture(`<div data-controller="hotkeys-reconnect" id="reconnect"></div>`)
      application.register('hotkeys-reconnect', UseHotkeysReconnectController)

      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('rebinds its hotkey after disconnecting and reconnecting', async function () {
      keyDown('#reconnect', { key: 'y', keyCode: 89, which: 89 })
      keyUp('#reconnect', { key: 'y', keyCode: 89, which: 89 })
      expect(testLogger.eventsFilter({ name: ['reconnect'] }).length).to.equal(1)

      testLogger.clear()
      document.querySelector('#reconnect').remove()
      await nextFrame()
      await delay()
      expect(registrations(r => r.shortcut === 'y').length).to.equal(0)

      fixture.innerHTML = `<div data-controller="hotkeys-reconnect" id="reconnect"></div>`
      await nextFrame()
      await delay()
      expect(registrations(r => r.shortcut === 'y').length).to.equal(1)

      keyDown('#reconnect', { key: 'y', keyCode: 89, which: 89 })
      keyUp('#reconnect', { key: 'y', keyCode: 89, which: 89 })
      expect(testLogger.eventsFilter({ name: ['reconnect'] }).length).to.equal(1)
    })
  })
})
