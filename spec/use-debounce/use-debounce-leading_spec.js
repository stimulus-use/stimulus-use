import { Application } from '@hotwired/stimulus'
import { nextFrame, TestLogger, click, delay } from '../helpers'
import UseLogObjectDescriptionController from './use_log_object_description_controller'
import { fixtureBase } from './fixtures'

describe('useDebounce leading edge across separate bursts', function () {
  let application
  let testLogger
  const wait = 200

  before('initialize controller', async function () {
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger
    fixture.set(fixtureBase)
    application.register('debounce', UseLogObjectDescriptionController)
    await nextFrame()
  })

  after('stop application', async function () {
    await application.stop()
  })

  it('fires on the leading edge again for a later, separate call', async function () {
    const dCount = () => testLogger.eventsFilter({ name: ['d'] }).length

    click('#debounced')
    await nextFrame()
    expect(dCount()).to.equal(1, 'leading fired on first call')

    await delay(wait + 20)
    expect(dCount()).to.equal(1, 'no trailing run for a single leading call')

    click('#debounced')
    await nextFrame()
    expect(dCount()).to.equal(2, 'leading fired again on the second, separate call')

    await delay(wait + 20)
    expect(dCount()).to.equal(2, 'still no extra trailing run')
  })
})
