import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, click, remove, setFixture } from '../helpers'
// import { LogController } from './log_controller'
import { UseLogController } from './use_log_controller'
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
    fixture: fixtureBase,
    options: {},
    answers: {
      appearEvent: 'visibility:visible',
      appearEventCount: 1
    }
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`IntersectionController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger
      beforeAll(async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        setFixture(scenario.fixture)
        application.register('visibility', Controller.controller)
        await nextFrame()
      })

      afterAll(async function () {
        await application.stop()
        await nextFrame()
      })

      describe('initiale state', function () {
        it('set isVisibility to true on connect', async function () {
          expect(testLogger.eventsFilter({ type: ['connect'], visibility: [true] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ type: ['initialize'], visibility: [true] }).length).to.equal(1)
        })
      })

      describe(`Preserve connect and disconnect lifecycles`, async function () {
        beforeAll(async function () {
          await remove('#controller-1')
        })

        it('initialize with this context', async function () {
          expect(testLogger.eventsFilter({ id: ['1'], type: ['initialize'] }).length).to.equal(1)
        })

        it('connect with this context', async function () {
          expect(testLogger.eventsFilter({ id: ['1'], type: ['connect'] }).length).to.equal(1)
        })

        it('disconnect with this context', async function () {
          expect(testLogger.eventsFilter({ id: ['1'], type: ['disconnect'] }).length).to.equal(1)
        })
      })
    })
  })
})
