import { Controller, Application } from 'stimulus'
import { useApplication, ApplicationController } from '../src'
import { nextFrame, TestLogger } from './helpers'
import { expect } from 'chai'

const application = Application.start()

const testLogger = new TestLogger()

class LogController extends ApplicationController {
  log(e) {
    testLogger.log({ id: this.id, event: 'dispatch' })
  }

  count() {
    // TODO somehow in Karma environemnt the event does not Bubbles
    const el = document.querySelector('[data-controller=application]')
    this.dispatch('add', { target: el, detail: { quantity: 1 } })
  }

  get id() {
    return this.element.dataset.id
  }
}

class UseLogController extends Controller {
  initialize() {
    useApplication(this)
  }

  log(e) {
    testLogger.log({ id: this.id, event: 'dispatch' })
  }

  count() {
    // TODO somehow in Karma environemnt the event does not Bubbles
    const el = document.querySelector('[data-controller=application]')
    this.dispatch('add', { target: el, detail: { quantity: 1 } })
  }

  get id() {
    return this.element.dataset.id
  }
}

const controllers = [LogController, UseLogController]

controllers.forEach(Controller => {
  describe(`ApplicationController tests`, function () {
    before('initialize controller', async function () {
      testLogger.clear()
      fixture.load('index-application.html')
      application.register('application', Controller)
      await nextFrame()
    })

    describe('click dispatch a count ', function () {
      it('parent controller receives the message', async function () {
        fixture.el.querySelector('#children').click()
        await nextFrame()

        expect(testLogger.eventsById('1').length).to.equal(1)
        expect(testLogger.eventsById('1')[0].event).to.equal('dispatch')
        expect(testLogger.eventsById('2').length).to.equal(0)
      })
    })

    describe('test getters', function () {
      it('preview getter returns the correct value when it changes', function () {
        expect(application.controllers[0].isPreview).to.equal(false)
        document.documentElement.setAttribute('data-turbolinks-preview', true)
        expect(application.controllers[0].isPreview).to.equal(true)
        document.documentElement.removeAttribute('data-turbolinks-preview')
      })

      it('csrf token is correctly updated', function () {
        expect(application.controllers[0].csrfToken).to.equal(null)
        document.head.innerHTML += '<meta crsf-token="12345678">'
        expect(application.controllers[0].csrfToken).to.equal('12345678')
      })
    })
  })
})
