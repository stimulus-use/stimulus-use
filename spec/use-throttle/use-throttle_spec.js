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
    fixture: fixtureBase,
    answers: {
      firstACount: 1,
      secondACount: 2,
      firstBCount: 2,
      secondBCount: 3,
      firstCCount: 1,
      secondCCount: 2
    }
  },
  {
    name: 'with empty object option',
    fixture: fixtureBase,
    options: {},
    answers: {
      firstACount: 1,
      secondACount: 2,
      firstBCount: 2,
      secondBCount: 3,
      firstCCount: 1,
      secondCCount: 2
    }
  },
  {
    name: 'with custom wait',
    fixture: fixtureBase,
    options: {
      wait: 50
    },
    answers: {
      firstACount: 1,
      secondACount: 2,
      firstBCount: 2,
      secondBCount: 3,
      firstCCount: 1,
      secondCCount: 1
    }
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`ThrottleController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger

      before('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.set(scenario.fixture)
        application.register('throttle', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function () {
        await application.stop()
      })

      describe('perform multiple clicks', async function () {
        it('it throttles a function', async function () {
          const { answers, options } = scenario
          const waitValue = (options && options.wait) || 200
          click('#throttled')
          await delay(waitValue - 10)
          click('#throttled')
          await nextFrame()
          expect(testLogger.eventsFilter({ name: ['a'], id: ['throttled'] }).length).to.equal(answers.firstACount)
          expect(testLogger.eventsFilter({ name: ['b'], id: ['throttled'] }).length).to.equal(answers.firstBCount)
          expect(testLogger.eventsFilter({ name: ['c'], id: ['throttled'] }).length).to.equal(answers.firstCCount)
          await delay(waitValue + 20)
          click('#throttled')
          await nextFrame()
          expect(testLogger.eventsFilter({ name: ['a'], id: ['throttled'] }).length).to.equal(answers.secondACount)
          expect(testLogger.eventsFilter({ name: ['b'], id: ['throttled'] }).length).to.equal(answers.secondBCount)
          expect(testLogger.eventsFilter({ name: ['c'], id: ['throttled'] }).length).to.equal(answers.secondCCount)
        })
      })
    })
  })
})
