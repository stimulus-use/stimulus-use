import { Application } from '@hotwired/stimulus'
import { nextFrame, delay, TestLogger, setFixture } from '../helpers'
import { UseResizeLogController, UseResizeElementController } from './use_resize_behavior_controllers'

const settle = async () => {
  await nextFrame()
  await delay()
  await delay(50)
}

describe(`useResize behavior`, function () {
  describe('dispatched event', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`<div data-controller="resizable" id="box" style="width: 100px"></div>`)
      application.register('resizable', UseResizeLogController)

      await settle()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('dispatches a prefixed resize event carrying the entry', async function () {
      const box = document.querySelector('#box') as HTMLElement
      const received: CustomEvent[] = []

      box.addEventListener('resizable:resize', event => received.push(event as CustomEvent))
      box.style.width = '250px'

      await settle()

      expect(received.length).to.be.greaterThan(0)
      const [event] = received
      expect(event.detail.controller).to.be.ok
      expect(Math.round(event.detail.entry.contentRect.width)).to.equal(250)
    })
  })

  describe('observe / unobserve control', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`<div data-controller="resizable-control" id="box" style="width: 100px"></div>`)
      application.register('resizable-control', UseResizeLogController)
      await settle()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('stops firing after unobserve and resumes after observe', async function () {
      const box = document.querySelector('#box') as HTMLElement
      const controller = application.getControllerForElementAndIdentifier(box, 'resizable-control')

      testLogger.clear()
      box.style.width = '150px'

      await settle()

      expect(testLogger.eventsFilter({ name: ['resize'] }).length).to.be.greaterThan(0)

      controller.unobserve()
      testLogger.clear()
      box.style.width = '300px'

      await settle()

      expect(testLogger.eventsFilter({ name: ['resize'] }).length).to.equal(0)

      controller.observe()
      await settle()
      testLogger.clear()
      box.style.width = '350px'

      await settle()

      expect(testLogger.eventsFilter({ name: ['resize'] }).length).to.be.greaterThan(0)
    })
  })

  describe('element option', function () {
    let application
    let testLogger

    beforeAll(async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger

      setFixture(`
        <div data-controller="resize-element" id="root" style="width: 500px">
          <div data-resize-element-target="observed" id="observed" style="width: 200px"></div>
        </div>
      `)

      application.register('resize-element', UseResizeElementController)

      await settle()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('observes the element from options with its own dimensions', async function () {
      const observed = document.querySelector('#observed') as HTMLElement

      testLogger.clear()
      observed.style.width = '275px'

      await settle()

      const events = testLogger.eventsFilter({ name: ['resize-element'] })
      expect(events.length).to.be.greaterThan(0)
      expect(events[events.length - 1].width).to.equal(275)
    })
  })
})
