import { Application } from 'stimulus'
import { nextFrame, TestLogger, click, delay } from '../helpers'
import { expect } from 'chai'
import UseLogController from './use_log_controller'
import { fixtureBase } from './fixtures'

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
    name: 'with custom delay',
    fixture: fixtureBase,
    options: {
      delay: 50
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
          const delayValue = (scenario.options && scenario.options.delay) || 200
          click('#debounced')
          await delay(delayValue - 10)
          click('#debounced')
          await nextFrame()
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(0)
          expect(testLogger.eventsFilter({ name: ['b'] }).length).to.equal(2)
          await delay(delayValue + 50)
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(1)
        })
      })
    })
  })
})
