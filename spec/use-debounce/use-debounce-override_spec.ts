import { Application, Controller } from '@hotwired/stimulus'
import { useDebounce } from '../../src'
import { nextFrame, TestLogger, click, delay, setFixture } from '../helpers'

class OverrideController extends Controller {
  static debounces = [
    { name: 'leadingOnly', trailing: false },
    { name: 'trailingOnly', leading: false }
  ]

  connect() {
    useDebounce(this, this.application.options)
  }

  leadingOnly() {
    this.application.testLogger.log({ name: 'leadingOnly' })
  }

  trailingOnly() {
    this.application.testLogger.log({ name: 'trailingOnly' })
  }
}

describe('useDebounce per-action options override the global option', function () {
  let application
  let testLogger
  const wait = 200
  const count = name => testLogger.eventsFilter({ name: [name] }).length

  beforeAll(async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger
    application.options = { leading: true }
    setFixture(`
      <div data-controller="override">
        <div id="btn" data-action="click->override#leadingOnly click->override#trailingOnly"></div>
      </div>
    `)
    application.register('override', OverrideController)
    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('merges per-action options on top of the global option', async function () {
    click('#btn')
    click('#btn')
    await nextFrame()

    expect(count('leadingOnly')).to.equal(1, 'leadingOnly fired on the leading edge')
    expect(count('trailingOnly')).to.equal(0, 'trailingOnly did not fire on the leading edge')

    await delay(wait + 20)

    expect(count('leadingOnly')).to.equal(1, 'leadingOnly has no trailing run (trailing:false)')
    expect(count('trailingOnly')).to.equal(1, 'trailingOnly fired on the trailing edge')
  })
})
