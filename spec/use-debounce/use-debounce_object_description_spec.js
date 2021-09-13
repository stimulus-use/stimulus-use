import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, click, delay } from '../helpers'
import { expect } from 'chai'
import UseLogObjectDescriptionController from './use_log_object_description_controller'
import { fixtureBase } from './fixtures'

const controllers = [
  {
    type: 'mixin',
    controller: UseLogObjectDescriptionController
  }
]

const scenarios = [
  {
    name: 'with nill options',
    fixture: fixtureBase,
    answers: {
      firstACount: 0,
      secondACount: 1,
      firstBCount: 2,
      firstCCount: 1,
      secondCCount: 1
    }
  },
  {
    name: 'with empty object option',
    fixture: fixtureBase,
    options: {},
    answers: {
      firstACount: 0,
      secondACount: 1,
      firstBCount: 2,
      firstCCount: 1,
      secondCCount: 1
    }
  },
  {
    name: 'with custom wait',
    fixture: fixtureBase,
    options: {
      wait: 500
    },
    answers: {
      firstACount: 1,
      secondACount: 1,
      firstBCount: 2,
      firstCCount: 1,
      secondCCount: 1
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
          const { answers, options } = scenario
          const waitValue = (options && options.wait) || 200
          click('#debounced')
          await delay(20)
          click('#debounced')
          await delay(waitValue + 20)
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(answers.firstACount)
          expect(testLogger.eventsFilter({ name: ['b'] }).length).to.equal(answers.firstBCount)
          expect(testLogger.eventsFilter({ name: ['c'] }).length).to.equal(answers.firstCCount)
          await delay(waitValue + 20)
          expect(testLogger.eventsFilter({ name: ['a'] }).length).to.equal(answers.secondACount)
          expect(testLogger.eventsFilter({ name: ['c'] }).length).to.equal(answers.secondCCount)
        })
      })
    })
  })
})
