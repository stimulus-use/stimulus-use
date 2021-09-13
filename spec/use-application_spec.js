import { Controller, Application } from '@hotwired/stimulus'
import { useApplication, ApplicationController } from '../src'
import { nextFrame, TestLogger, click } from './helpers'
import { expect } from 'chai'

const application = Application.start()

const testLogger = new TestLogger()

class LogController extends ApplicationController {
  log(e) {
    testLogger.log({ id: this.id, event: 'dispatch' })
  }

  count() {
    this.dispatch('add', { quantity: 1 })
  }

  get id() {
    return this.element.dataset.id
  }

  get options() {
    // TODO somehow in Karma environemnt the event does not Bubbles
    return { element: document.querySelector('#cart') }
  }
}

class UseLogController extends Controller {
  initialize() {
    // TODO somehow in Karma environemnt the event does not Bubbles
    const element = document.querySelector('#cart')
    useApplication(this, { element })
  }

  log(e) {
    testLogger.log({ id: this.id, event: 'dispatch', quantity: e.detail.quantity })
  }

  count() {
    this.dispatch('add', { quantity: 1 })
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
        click('#children')
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
        document.documentElement.setAttribute('data-turbo-preview', true)
        expect(application.controllers[0].isPreview).to.equal(true)
        document.documentElement.removeAttribute('data-turbo-preview')
      })

      it('csrf token is correctly updated', async function () {
        expect(application.controllers[0].csrfToken).to.equal(null)
        document.head.innerHTML += '<meta name="csrf-token" content="12345678">'
        expect(application.controllers[0].csrfToken).to.equal('12345678')
        document.head.querySelector(`meta[name="csrf-token"]`).remove()
      })
    })
  })
})
