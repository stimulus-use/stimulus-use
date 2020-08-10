import { Application } from 'stimulus'
import { nextFrame, TestLogger, click } from '../helpers'
import { expect } from 'chai'
import LogController from './log_controller'
import UseLogController from './use_log_controller'

let testLogger
let application

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
    options: {},
    answers: {
      eventCount: 1,
      callbackCounts: 1,
      eventName: 'modal:click:outside',
    },
  },
  {
    name: 'with custom prefix',
    options: {
      eventPrefix: 'custom',
    },
    answers: {
      eventCount: 1,
      callbackCounts: 1,
      eventName: 'custom:click:outside',
    },
  },
  {
    name: 'without prefix',
    options: {
      eventPrefix: false,
    },
    answers: {
      eventCount: 1,
      callbackCounts: 1,
      eventName: 'click:outside',
    },
  },
  {
    name: 'dispatch event false',
    options: {
      dispatchEvent: false,
    },
    answers: {
      eventCount: 0,
      callbackCounts: 1,
    },
  },
  {
    name: 'only touch end events',
    options: {
      events: ['touchend'],
    },
    answers: {
      eventCount: 0,
      callbackCounts: 0,
    },
  },
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`ClickOutsideController tests scenario : ${scenario.name} controller type ${Controller.type}`, function () {
      before('initialize controller', async function () {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.load('index-click-outside.html')
        application.register('modal', Controller.controller)
        await nextFrame()
      })

      after('stop applcation', async function () {
        await application.stop()
      })

      describe(`clicking outside and inside of the div`, function () {
        before('perform the clicks', async function () {
          click('#outside-1')
          click('#inside-1')
        })
        it('it triggers the outsideClick function', async function () {
          expect(testLogger.eventsFilter({ id: ['1'] }).length).to.equal(
            scenario.answers.eventCount + scenario.answers.callbackCounts,
          )
          expect(testLogger.eventsFilter({ id: ['2'] }).length).to.equal(0)
          expect(testLogger.eventsFilter({ id: ['1'], type: ['callback'] }).length).to.equal(
            scenario.answers.callbackCounts,
          )
          expect(testLogger.eventsFilter({ id: ['1'], type: ['event'] }).length).to.equal(scenario.answers.eventCount)
          if (scenario.answers.eventCount > 0) {
            expect(testLogger.eventsFilter({ id: ['1'], type: ['event'] })[0].name).to.equal(scenario.answers.eventName)
          }
        })
      })

      describe(`clicking outside invisible div`, async function () {
        before('perform the clicks', function () {
          click('#outside-1')
        })
        it('it triggers the outsideClick function', function () {
          expect(testLogger.eventsFilter({ id: ['2'] }).length).to.equal(0)
        })
      })
    })
  })
})
