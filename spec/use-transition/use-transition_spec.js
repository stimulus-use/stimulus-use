import { Application } from 'stimulus'
import { nextFrame, TestLogger, remove, click, classList, delay } from '../helpers'
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
      await nextFrame()
      fixture.set(fixtureBase)
      application.register('transition', Controller.controller)
      await nextFrame()
    })

    afterEach('stop application', async function () {
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

    describe(`toggle element to trigger enter/leave`, async function () {
      it('add the starting class', async function () {
        // enter
        expect(classList('#transitionable-element')).to.equal('hidden')
        await click('#transitionable-element')
        expect(classList('#transitionable-element')).to.equal('enter-class enter-active-class')

        await nextFrame()
        expect(classList('#transitionable-element')).to.equal('enter-active-class enter-to-class')

        await delay(40)
        expect(classList('#transitionable-element')).to.equal('')

        // leave
        await click('#transitionable-element')
        expect(classList('#transitionable-element')).to.equal('leave-class leave-active-class')

        await nextFrame()
        expect(classList('#transitionable-element')).to.equal('leave-active-class leave-to-class')

        await delay(40)
        expect(classList('#transitionable-element')).to.equal('hidden')
      })
    })

    describe(`enter`, async function () {
      it('preserves initials classes', async function () {
        document.querySelector('#transitionable-element').classList.add('to-preserve')
        document.querySelector('#transitionable-element').dataset.transitionEnterActive += ' to-preserve'

        // enter
        await click('#transitionable-element')
        expect(sortClasses(classList('#transitionable-element'))).to.equal(
          sortClasses('to-preserve enter-class enter-active-class')
        )

        await nextFrame()
        expect(sortClasses(classList('#transitionable-element'))).to.equal(
          sortClasses('to-preserve enter-active-class enter-to-class')
        )

        await delay(40)
        expect(sortClasses(classList('#transitionable-element'))).to.equal('to-preserve')
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

function sortClasses(string, separator = ' ') {
  return string.split(separator).sort().join(',')
}
