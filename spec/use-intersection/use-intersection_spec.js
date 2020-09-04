import { Application } from 'stimulus'
import { nextFrame, TestLogger, click, remove } from '../helpers'
import { expect } from 'chai'
import { LogController } from './log_controller'
import { UseLogController } from './use_log_controller'
import { fixtureBase, fixtureCustomPrefix, fixtureWithoutPrefix } from './fixtures'

const controllers = [
  {
    type: 'controller',
    controller: LogController,
  },
  {
    type: 'mixin',
    controller: UseLogController,
  },
]

const scenarios = [
  {
    name: 'default scenario',
    fixture: fixtureBase,
    options: {},
    answers: {
      appearEvent: 'intersection:appear',
      appearEventCount: 1,
    },
  },
  {
    name: 'with custom prefix',
    fixture: fixtureCustomPrefix,
    options: {
      eventPrefix: 'custom',
    },
    answers: {
      appearEvent: 'custom:appear',
      appearEventCount: 1,
    },
  },
  {
    name: 'without prefix',
    fixture: fixtureWithoutPrefix,
    options: {
      eventPrefix: false,
    },
    answers: {
      appearEvent: 'appear',
      appearEventCount: 1,
    },
  },
  {
    name: 'dispatch event false',
    fixture: fixtureBase,
    options: {
      dispatchEvent: false,
    },
    answers: {
      appearEvent: 'intersection:appear',
      appearEventCount: 0,
    },
  },
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`IntersectionController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      let application
      let testLogger
      before('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.set(scenario.fixture)
        application.register('intersection', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function () {
        await application.stop()
        await nextFrame()
      })

      describe('initiale state', function () {
        it('it fires one "appear" and no disappear', async function () {
          const { appearEvent, appearEventCount } = scenario.answers
          expect(testLogger.eventsFilter({ id: ['1'], type: ['appear', 'disappear'] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ id: ['1'], event: [appearEvent] }).length).to.equal(appearEventCount)
          expect(testLogger.eventsFilter({ id: ['2'], type: ['appear', 'disappear'] }).length).to.equal(0)
        })
      })

      describe('scroll down', function () {
        before('perform the clicks', async function () {
          await click('#scroll-down')
        })

        after('return to 0', async function () {
          await click('#scroll-top')
        })

        it('it fires one more "appear" for the second element and one disappear for the first', async function () {
          expect(testLogger.eventsFilter({ id: ['1'], type: ['disappear'] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ id: ['2'], type: ['appear'] }).length).to.equal(1)
          expect(testLogger.eventsFilter({ id: ['2'], type: ['disappear'] }).length).to.equal(0)
        })
      })

      describe(`Preserve connect and disconnect lifecycles`, async function () {
        before('perform a full lifecycle', async function () {
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
