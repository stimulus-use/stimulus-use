import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger } from '../helpers'
import { LogController } from './log_controller'
import { UseLogController } from './use_log_controller'
import { fixtureBase } from './fixtures'

const controllers = [
  {
    type: 'controller',
    controller: LogController
  },
  {
    type: 'mixin',
    controller: UseLogController
  }
]

controllers.forEach(Controller => {
  describe(`WindowFocusController tests controller type ${Controller.type}`, function () {
    let application
    let testLogger
    let focused
    let originalHasFocus

    const count = type => testLogger.logs.filter(entry => entry.type === type).length

    beforeEach('initialize controller', async function () {
      // `useWindowFocus` polls `document.hasFocus()`, so stub it to control the
      // window focus state deterministically (the ambient focus of a headless
      // browser is unreliable).
      originalHasFocus = document.hasFocus.bind(document)
      focused = true
      document.hasFocus = () => focused

      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger
      // short poll interval so the tests stay fast
      application.options = { interval: 20 }
      fixture.set(fixtureBase)
      application.register('window-focus', Controller.controller)
      await nextFrame()
      await nextFrame()
    })

    afterEach('stop application', async function () {
      fixture.cleanup()
      await application.stop()
      document.hasFocus = originalHasFocus
      await nextFrame()
    })

    it('is focused from the beginning', function () {
      expect(count('focus')).to.equal(1)
      expect(count('unfocus')).to.equal(0)
    })

    it('detects when the window loses and regains focus', async function () {
      focused = false
      await delay(80)
      expect(count('unfocus')).to.equal(1)

      focused = true
      await delay(80)
      expect(count('focus')).to.equal(2)
    })
  })
})
