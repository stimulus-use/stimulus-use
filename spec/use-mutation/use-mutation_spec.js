import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, remove } from '../helpers'
import { expect } from 'chai'
import LogController from './log_controller'
import UseLogController from './use_log_controller'
import { fixtureBase } from './fixtures'

const controllers = [
  {
    type: 'controller',
    controller: LogController
  },
  {
    type: 'mixin',
    controller: UseLogController
  }
]

const scenarios = [
  // {
  //   name: 'default options',
  //   fixture: fixtureBase,
  //   options: {},
  //   answers: {}
  // },
  {
    name: 'childList: true',
    fixture: fixtureBase,
    options: { childList: true },
    answers: {}
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`useMutation tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger
      beforeEach('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.set(scenario.fixture)
        application.register('mutation', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function () {
        await application.stop()
        await nextFrame()
      })

      describe('initiale state', function () {
        it('connects but does not not call mutate', async function () {
          await nextFrame()
          expect(testLogger.eventsFilter({ event: ['connect'] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ event: ['mutate'] }).length).to.equal(0)
        })
      })

      describe('remove an element inside the controller', function () {
        it('calls mutate', async function () {
          await remove('#input')
          expect(testLogger.eventsFilter({ event: ['entry'] }).length).to.equal(1)
        })
      })

      describe('remove an element outside the controller', function () {
        it('does not calls mutate', async function () {
          await remove('#outer')
          expect(testLogger.eventsFilter({ event: ['entry'] }).length).to.equal(0)
        })
      })

      describe(`remove the element`, async function () {
        it('fires disconnect preserving `this` context', async function () {
          await remove('#controller')
          expect(testLogger.eventsFilter({ id: ['controller'], event: ['disconnect'] }).length).to.equal(1)
        })
      })
    })
  })
})
