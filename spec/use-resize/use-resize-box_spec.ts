import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, setFixture } from '../helpers'
import { UseResizeLogController, UseResizeBorderBoxController } from './use_resize_behavior_controllers'

const settle = async () => {
  await nextFrame()
  await delay()
  await delay(50)
}

describe(`useResize box option`, function () {
  describe('observing the border box', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`<div data-controller="resize-borderbox" id="bb" style="box-sizing: content-box; width: 100px"></div>`)
      application.register('resize-borderbox', UseResizeBorderBoxController)
      await settle()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('fires when padding changes the border box but not the content box', async function () {
      const element = document.querySelector('#bb') as HTMLElement

      testLogger.clear()
      element.style.padding = '20px'
      await settle()

      expect(testLogger.eventsFilter({ name: ['resize-border'] }).length).to.be.greaterThan(0)
    })
  })

  describe('observing the content box (default)', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(
        `<div data-controller="resize-contentbox" id="cb" style="box-sizing: content-box; width: 100px"></div>`
      )

      application.register('resize-contentbox', UseResizeLogController)

      await settle()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('does not fire when only padding changes', async function () {
      const element = document.querySelector('#cb') as HTMLElement

      testLogger.clear()
      element.style.padding = '20px'
      await settle()

      expect(testLogger.eventsFilter({ name: ['resize'] }).length).to.equal(0)
    })
  })
})
