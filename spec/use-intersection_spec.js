import { Controller, Application } from 'stimulus'
import { useIntersection, IntersectionController } from '../src'
import { nextFrame, TestLogger } from './helpers'
import { expect } from 'chai'

const application = Application.start()

const testLogger = new TestLogger()

class LogController extends IntersectionController {
  appear() {
    testLogger.log({ id: this.id, event: 'appear' })
  }

  disappear() {
    testLogger.log({ id: this.id, event: 'disappear' })
  }

  get id() {
    return this.element.dataset.id
  }
}

class UseLogController extends Controller {
  initialize() {
    useIntersection(this)
  }

  appear() {
    testLogger.log({ id: this.id, event: 'appear' })
  }

  disappear() {
    testLogger.log({ id: this.id, event: 'disappear' })
  }

  get id() {
    return this.element.dataset.id
  }
}

const controllers = [LogController, UseLogController]

controllers.forEach(Controller => {
  describe(`IntersectionController tests`, function () {
    before('initialize controller', async function () {
      testLogger.clear()
      fixture.load('index.html')
      application.register('intersection', Controller)
      await nextFrame()
    })

    describe('with one visible element and one hidden', function () {
      it('it fires one "appear" and no disappear', async function () {
        expect(testLogger.eventsById('1').length).to.equal(1)
        expect(testLogger.eventsById('1')[0].event).to.equal('appear')
        expect(testLogger.eventsById('2').length).to.equal(0)
      })
    })
  })
})
