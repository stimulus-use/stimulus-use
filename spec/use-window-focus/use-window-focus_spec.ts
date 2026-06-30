import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, setFixture, cleanupFixture } from '../helpers'
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

    beforeEach(async function () {
      originalHasFocus = document.hasFocus.bind(document)
      focused = true

      document.hasFocus = () => focused

      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger
      application.options = { interval: 20 }

      setFixture(fixtureBase)

      application.register('window-focus', Controller.controller)

      await nextFrame()
      await nextFrame()
    })

    afterEach(async function () {
      cleanupFixture()

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
