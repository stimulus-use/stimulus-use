import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, delay, setFixture } from '../helpers'
import UseLogArgumentController from './use_log_argument_controller'

// https://github.com/stimulus-use/stimulus-use/issues/551
describe(`debounced controller action invoked with arguments`, function () {
  let application
  let testLogger
  let element

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger
    application.options = {}

    element = setFixture(`<div data-controller="debounce-arguments"></div>`).querySelector(
      '[data-controller="debounce-arguments"]'
    )
    application.register('debounce-arguments', UseLogArgumentController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  beforeEach(function () {
    testLogger.clear()
  })

  // https://github.com/stimulus-use/stimulus-use/issues/551 — primitive argument
  it('debounces a method called with a primitive argument and passes it through', async function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')

    controller.search('toto')

    await delay(210)
    await nextFrame()

    const events = testLogger.eventsFilter({ name: ['search'] })
    expect(events.length).to.equal(1)
    expect(events[0].query).to.equal('toto')
  })

  // https://github.com/stimulus-use/stimulus-use/issues/295 — object argument without a `params` key
  it('does not mutate a non-event object argument', async function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')
    const argument = { mention: '/user/mentions' }

    controller.search(argument)

    await delay(210)
    await nextFrame()

    const events = testLogger.eventsFilter({ name: ['search'] })
    expect(events.length).to.equal(1)
    expect(events[0].query).to.equal(argument)
    expect('params' in argument).to.equal(false)
  })

  it('passes multiple arguments through unchanged', async function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')

    controller.search('query', 42, { page: 2 })

    await delay(210)
    await nextFrame()

    const events = testLogger.eventsFilter({ name: ['search'] })
    expect(events.length).to.equal(1)
    expect(events[0].args).to.deep.equal(['query', 42, { page: 2 }])
  })

  const primitives = [
    { label: 'a number', value: 42 },
    { label: 'a boolean', value: false },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined }
  ]

  primitives.forEach(({ label, value }) => {
    it(`does not throw when called with ${label}`, async function () {
      const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')

      controller.search(value)

      await delay(210)
      await nextFrame()

      const events = testLogger.eventsFilter({ name: ['search'] })
      expect(events.length).to.equal(1)
      expect(events[0].query).to.equal(value)
    })
  })

  it('works when called with no arguments', async function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')

    controller.search()

    await delay(210)
    await nextFrame()

    const events = testLogger.eventsFilter({ name: ['search'] })
    expect(events.length).to.equal(1)
    expect(events[0].args).to.deep.equal([])
  })

  it('collapses rapid calls into a single trailing call with the latest arguments', async function () {
    const controller = application.getControllerForElementAndIdentifier(element, 'debounce-arguments')

    controller.search('first')
    controller.search('second')
    controller.search('third')

    await delay(210)
    await nextFrame()

    const events = testLogger.eventsFilter({ name: ['search'] })
    expect(events.length).to.equal(1)
    expect(events[0].query).to.equal('third')
  })
})
