import { Controller, Application } from 'stimulus'
import { useClickOutside, ClickOutsideController } from '../src'
import { nextFrame, TestLogger } from './helpers'
import { expect } from 'chai'

const application = Application.start()

const testLogger = new TestLogger()

class LogController extends ClickOutsideController {
  clickOutside() {
    testLogger.log({ id: this.id, event: 'clickOutside' })
  }

  close() {
    testLogger.log({ id: this.id, event: 'click:outside' })
  }

  get id() {
    return this.element.dataset.id
  }
}

class UseLogController extends Controller {
  initialize() {
    useClickOutside(this)
  }

  clickOutside() {
    testLogger.log({ id: this.id, event: 'clickOutside' })
  }

  close() {
    testLogger.log({ id: this.id, event: 'click:outside' })
  }

  get id() {
    return this.element.dataset.id
  }
}

const controllers = [LogController, UseLogController]

controllers.forEach(Controller => {
  describe(`ClickOutsideController tests`, function () {
    before('initialize controller', async function () {
      fixture.load('index-click-outside.html')
      application.register('modal', Controller)
      await nextFrame()
    })

    describe(`clicking outside and inside of the div`, function () {
      before('perform the clicks', async function () {
        testLogger.clear()
        fixture.el.querySelector('#outside-1').click()
        fixture.el.querySelector('#inside-1').click()
      })
      it('it triggers the outsideClick function', async function () {
        expect(testLogger.eventsById('1').length).to.equal(2)
        expect(testLogger.eventsById('1')[0].event).to.equal('clickOutside')
        expect(testLogger.eventsById('1')[1].event).to.equal('click:outside')
      })
    })

    describe(`clicking outside invisible div`, function () {
      before('perform the clicks', async function () {
        testLogger.clear()
        fixture.el.querySelector('#outside-1').click()
      })
      it('it triggers the outsideClick function', async function () {
        expect(testLogger.eventsById('2').length).to.equal(0)
      })
    })
  })
})
