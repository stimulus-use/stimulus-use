import { Application } from '@hotwired/stimulus'
import { page } from '@vitest/browser/context'
import { nextFrame, TestLogger, setFixture, cleanupFixture } from '../helpers'
import { UseLogController } from './use_log_controller'
import { fixtureBase } from './fixtures'

const options = {
  mediaQueries: {
    small: '(max-width: 768px)'
  }
}

describe('useMatchMedia tests', function () {
  let application
  let testLogger

  const count = type => testLogger.logs.filter(entry => entry.type === type).length

  beforeEach(async function () {
    await page.viewport(1000, 600)
    application = Application.start()
    testLogger = new TestLogger()
    application.testLogger = testLogger
    application.options = options
    setFixture(fixtureBase)
    application.register('match-media', UseLogController)
    await nextFrame()
  })

  afterEach(async function () {
    cleanupFixture()
    await application.stop()
    await nextFrame()
  })

  it('reflects the initial state (not small at 1000px wide)', function () {
    expect(count('notSmall')).to.equal(1)
    expect(count('isSmall')).to.equal(0)
    expect(count('smallChanged')).to.equal(0)
  })

  it('fires when the media query starts matching', async function () {
    await page.viewport(320, 600)
    await nextFrame()

    expect(count('isSmall')).to.equal(1)
    expect(count('smallChanged')).to.equal(1)
  })

  it('fires again when the media query stops matching', async function () {
    await page.viewport(320, 600)
    await nextFrame()
    await page.viewport(1000, 600)
    await nextFrame()

    expect(count('notSmall')).to.equal(2)
    expect(count('smallChanged')).to.equal(2)
  })
})
