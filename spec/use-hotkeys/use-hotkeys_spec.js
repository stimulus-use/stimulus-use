import { Application } from 'stimulus'
import { nextFrame, TestLogger, keyPress } from '../helpers'
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
    name: 'with single character "/"',
    fixture: fixtureBase,
    keyboardEventInit: { keyCode: 191, which: 191 },
    handler: 'singleKeyHandler'
  },
  {
    name: 'with meta key and single character "a"',
    fixture: fixtureBase,
    keyboardEventInit: { metaKey: true, keyCode: 65, which: 65 },
    handler: 'metaKeyHandler'
  }
]

scenarios.forEach(scenario => {
  controllers.forEach(Controller => {
    describe(`HotkeysController tests scenario : ${scenario.name} controller type ${Controller.type}`, function() {
      let application
      let testLogger

      before('initialize controller', async function() {
        application = Application.start()
        testLogger = new TestLogger()
        application.testLogger = testLogger
        application.options = scenario.options
        fixture.set(scenario.fixture)
        application.register('hotkeys', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function() {
        await application.stop()
      })

      it('perform a keypress', async function() {
        const { keyboardEventInit, options, handler } = scenario
        const waitValue = (options && options.wait) || 200
        keyPress('body', keyboardEventInit)
        expect(testLogger.eventsFilter({ name: [handler], type: ['keydown'] }).length).to.equal(1)
      })
    })
  })
})
