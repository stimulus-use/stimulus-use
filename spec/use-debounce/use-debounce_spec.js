import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, click, delay } from '../helpers'
import { expect } from 'chai'
import UseLogController from './use_log_controller'
import { fixtureBase, sameEventMultipleActions } from './fixtures'

const controllers = [
  {
    type: 'mixin',
    controller: UseLogController
  }
]

const scenarios = [
  {
    name: 'with nill options',
    fixture: fixtureBase
  },
  {
    name: 'with empty object option',
    fixture: fixtureBase,
    options: {}
  },
  {
    name: 'with custom wait',
    fixture: fixtureBase,
    options: {
      wait: 50
    }
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`DebounceController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger

      before('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options

        fixture.set(scenario.fixture)
        application.register('debounce', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function () {
        await application.stop()
      })

      describe('perform multiple clicks', async function () {
        it('it debounces a function', async function () {
          const waitValue = (scenario.options && scenario.options.wait) || 200
          click('#debounced')
          await delay(waitValue - 10)
          click('#debounced')
          await nextFrame()
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(0, 'first a')
          expect(testLogger.eventsFilter({ name: ['b'] }).length).to.equal(2, 'first b')
          await delay(waitValue + 10)
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(1, 'second a')
        })
      })
    })
  })
})

describe(`debounced controller action should retain Stimulus action params`, function () {
  let application
  let testLogger

  before('initialize controller', async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    fixture.set(sameEventMultipleActions)
    application.register('debounce', UseLogController)
    await nextFrame()
  })

  after('stop application', async function () {
    await application.stop()
  })

  describe('retains action params', async function () {
    it('it debounces a function', async function () {
      const waitValue = 200

      click('#debounced')

      await nextFrame()

      expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(0)
      expect(testLogger.eventsFilter({ name: ['b'] }).length).to.equal(1)
      expect(testLogger.eventsFilter({ name: ['b'] })[0].params).to.deep.equal({})

      await delay(waitValue + 10)
      await nextFrame()

      expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(1)
      expect(testLogger.eventsFilter({ name: ['a'] })[0].params).to.deep.equal({ someId: 123 })
      expect(testLogger.eventsFilter({ name: ['b'] }).length).to.equal(1)
      expect(testLogger.eventsFilter({ name: ['b'] })[0].params).to.deep.equal({})
    })
  })
})
