import { Application } from 'stimulus'
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

controllers.forEach(Controller => {
  describe(`useTransition controller type ${Controller.type}`, function () {
    let application
    let testLogger
    beforeEach('initialize controller', async function () {
      application = Application.start()
      testLogger = new TestLogger()
      application.testLogger = testLogger
      fixture.set(fixtureBase)
      application.register('transition', Controller.controller)
      await nextFrame()
    })

    after('stop application', async function () {
      fixture.cleanup()
      await application.stop()
      await nextFrame()
    })

    describe('initiale state', function () {
      it('connects properly', async function () {
        await nextFrame()

        expect(testLogger.eventsFilter({ event: ['initialize'] }).length).to.equal(1)
        expect(testLogger.eventsFilter({ event: ['connect'] }).length).to.equal(1)
      })
    })

    describe(`remove the element`, async function () {
      it('fires disconnect preserving `this` context', async function () {
        await remove('#transitionable-element')

        expect(testLogger.eventsFilter({ id: ['transitionable-element'], event: ['disconnect'] }).length).to.equal(1)
      })
    })
  })
})
