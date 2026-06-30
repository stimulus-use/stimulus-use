import { Application } from '@hotwired/stimulus'
import { page } from '@vitest/browser/context'
import { nextFrame, TestLogger, setFixture, cleanupFixture } from '../helpers'
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
  describe(`WindowResizeController tests controller type ${Controller.type}`, function () {
    let application
    let testLogger

    const lastResize = () => testLogger.logs.filter(entry => entry.type === 'resize').pop()

    beforeEach(async function () {
      await page.viewport(1000, 600)
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger
      setFixture(fixtureBase)
      application.register('window-resize', Controller.controller)
      await nextFrame()
      await nextFrame()
    })

    afterEach(async function () {
      cleanupFixture()
      await application.stop()
      await nextFrame()
    })

    it('reports the initial window dimensions on connect', function () {
      const resize = lastResize()
      expect(resize.width).to.equal(1000)
      expect(resize.height).to.equal(600)
    })

    it('updates the dimensions when the window is resized', async function () {
      await page.viewport(1200, 700)
      await nextFrame()

      const resize = lastResize()
      expect(resize.width).to.equal(1200)
      expect(resize.height).to.equal(700)
    })
  })
})
