import { Application } from 'stimulus'
import hotkeys from 'hotkeys-js'
import { nextFrame, TestLogger, keyDown, keyUp } from '../helpers'
import { expect } from 'chai'
import UseLogController from './use_log_controller'
import { fixtureBase, fixtureWithFilter } from './fixtures'

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
    handler: 'singleKeyHandler',
    triggerCount: 1
  },
  {
    name: 'with meta key and single character "a"',
    fixture: fixtureBase,
    keyboardEventInit: { metaKey: true, keyCode: 65, which: 65 },
    handler: 'metaKeyHandler',
    triggerCount: 1
  },
  {
    name: 'with scope',
    fixture: fixtureBase,
    keyboardEventInit: { keyCode: 70, which: 70 },
    handler: 'scopeHandler',
    scope: 'files',
    triggerCount: 1
  },
  {
    name: 'with input filtered out',
    fixture: fixtureBase,
    keyboardEventInit: { keyCode: 66, which: 66 },
    handler: 'inputHandler',
    selector: '#input',
    triggerCount: 0
  },
  {
    name: 'with active input',
    fixture: fixtureWithFilter,
    keyboardEventInit: { keyCode: 66, which: 66 },
    handler: 'inputHandler',
    selector: '#input',
    triggerCount: 1
  },
  {
    name: 'on keyup',
    fixture: fixtureBase,
    keyboardEventInit: { keyCode: 67, which: 67 },
    handler: 'keyUpHandler',
    type: 'keyup',
    triggerCount: 1
  },
  {
    name: 'with different split key',
    fixture: fixtureBase,
    keyboardEventInit: { ctrlKey: true, keyCode: 68, which: 68 },
    handler: 'splitKeyHandler',
    triggerCount: 1
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
        fixture.set(scenario.fixture)
        application.register('hotkeys', Controller.controller)
        await nextFrame()
      })

      after('stop application', async function() {
        await application.stop()
      })

      it('perform a keypress', async function() {
        const {
          keyboardEventInit,
          handler,
          scope,
          selector = 'body',
          triggerCount,
          filter,
          type = 'keydown'
        } = scenario
        if (scope) hotkeys.setScope(scope)

        keyDown(selector, keyboardEventInit)
        keyUp(selector, keyboardEventInit)
        expect(testLogger.eventsFilter({ name: [handler], type: [type] }).length).to.equal(triggerCount)

        if (scope) {
          expect(hotkeys.getScope()).to.equal(scope)
        }
      })
    })
  })
})
