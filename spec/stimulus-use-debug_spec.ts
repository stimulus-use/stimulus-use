import { Controller, Application } from '@hotwired/stimulus'
import { useWindowFocus } from '../src'
import { nextFrame, setFixture } from './helpers'

const makeLogger = () => {
  const calls: any[] = []
  const noop = () => {}

  return {
    groupCollapsed: noop,
    group: noop,
    log: (...args: any[]) => calls.push(args),
    table: noop,
    warn: noop,
    error: noop,
    groupEnd: noop,
    calls
  }
}

class DebugController extends Controller {
  connect() {
    useWindowFocus(this, this.application.options)
  }
}

const deprecationWarnings = (spy: any) =>
  spy.mock.calls.filter((args: any[]) => String(args[0]).includes('stimulusUseDebug'))

describe(`StimulusUse debug mode`, function () {
  describe('with application.debug', function () {
    let application: any
    let logger: ReturnType<typeof makeLogger>
    let warnSpy: any

    beforeAll(async function () {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      logger = makeLogger()
      application = Application.start()
      application.debug = true
      application.options = { logger }

      setFixture(`<div data-controller="debug-app" id="d1"></div>`)
      application.register('debug-app', DebugController)
      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
      warnSpy.mockRestore()
    })

    it('enables stimulus-use logging', function () {
      expect(logger.calls.length).to.be.greaterThan(0)
    })

    it('does not emit a deprecation warning', function () {
      expect(deprecationWarnings(warnSpy).length).to.equal(0)
    })
  })

  describe('with the deprecated application.stimulusUseDebug', function () {
    let application: any
    let logger: ReturnType<typeof makeLogger>
    let warnSpy: any

    beforeAll(async function () {
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      logger = makeLogger()
      application = Application.start()
      application.stimulusUseDebug = true
      application.options = { logger }

      setFixture(`<div data-controller="debug-legacy" id="d2"></div>`)
      application.register('debug-legacy', DebugController)
      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
      warnSpy.mockRestore()
    })

    it('still enables logging (kept as a fallback)', function () {
      expect(logger.calls.length).to.be.greaterThan(0)
    })

    it('emits a deprecation warning', function () {
      expect(deprecationWarnings(warnSpy).length).to.be.greaterThan(0)
    })
  })

  describe('without any debug flag', function () {
    let application: any
    let logger: ReturnType<typeof makeLogger>

    beforeAll(async function () {
      logger = makeLogger()
      application = Application.start()
      application.options = { logger }

      setFixture(`<div data-controller="debug-off" id="d3"></div>`)
      application.register('debug-off', DebugController)
      await nextFrame()
    })

    afterAll(async function () {
      await application.stop()
    })

    it('does not log', function () {
      expect(logger.calls.length).to.equal(0)
    })
  })
})
