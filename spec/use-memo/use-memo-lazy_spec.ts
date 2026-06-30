import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, setFixture } from '../helpers'
import UseMemoLazyController from './use_memo_lazy_controller'

// https://github.com/stimulus-use/stimulus-use/issues/246
describe(`useMemo memoizes getters lazily`, function () {
  let application
  let testLogger
  let element

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger

    element = setFixture(`<div data-controller="memo-lazy"></div>`).querySelector('[data-controller="memo-lazy"]')
    application.register('memo-lazy', UseMemoLazyController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('does not evaluate the getter when useMemo() is called', function () {
    const [event] = testLogger.eventsFilter({ name: ['afterUseMemo'] })
    expect(event.evaluations).to.equal(0)
  })

  it('evaluates the getter once on first access and caches the result', function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'memo-lazy')

    expect(controller.memoized).to.equal('value-1')
    expect(controller.evaluations).to.equal(1)
    expect(controller.memoized).to.equal('value-1')
    expect(controller.evaluations).to.equal(1)
  })
})
