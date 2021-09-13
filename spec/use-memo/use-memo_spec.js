import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, click, remove } from '../helpers'
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
    name: 'default scenario',
    fixture: fixtureBase
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`MemoController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger

      before('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.set(scenario.fixture)
        application.register('memo', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function () {
        await application.stop()
      })

      describe('Memoization of getters', async function () {
        it('invokes getters a and b only once', async function () {
          expect(testLogger.eventsFilter({ type: ['getter:invoke'], name: ['a'] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ type: ['getter:invoke'], name: ['b'] }).length).to.equal(1)
        })

        it('invokes getter c twice', async function () {
          expect(testLogger.eventsFilter({ type: ['getter:invoke'], name: ['c'] }).length).to.equal(2)
        })
      })
    })
  })
})
