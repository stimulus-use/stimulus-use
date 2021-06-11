import { Application } from 'stimulus'
import hotkeys from 'hotkeys-js'
import { nextFrame, TestLogger, keyDown, keyUp } from '../helpers'
import { expect } from 'chai'
import { UseSimpleLogController, UseAdvancedLogController } from './use_log_controller'
import { fixtureBase, fixtureWithFilter } from './fixtures'

const controllers = [
  {
    type: 'simple mixin',
    controller: UseSimpleLogController,
    advanced: false
  },
  {
    type: 'advanced mixin',
    controller: UseAdvancedLogController,
    advanced: true
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
    advanced: true,
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
    advanced: true,
    triggerCount: 1
  },
  {
    name: 'on keyup',
    fixture: fixtureBase,
    keyboardEventInit: { keyCode: 67, which: 67 },
    handler: 'keyUpHandler',
    type: 'keyup',
    advanced: true,
    triggerCount: 1
  },
  {
    name: 'with different split key',
    fixture: fixtureBase,
    keyboardEventInit: { ctrlKey: true, keyCode: 68, which: 68 },
    handler: 'splitKeyHandler',
    advanced: true,
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
          type = 'keydown',
          advanced = false
        } = scenario

        if (advanced && !Controller.advanced) return

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
