import { Controller, Application } from '@hotwired/stimulus'
import { useCookie } from '../../src'
import { nextFrame } from '../helpers'
import { fixtureBase } from './fixtures'
import { getCookieValue, setBrowserCookies } from './helpers'

const defaultOptions = {
  expires: 30,
  suffix: true
}

const declaredCookieNames = ['lunch', 'breakfast']
class UseLogController extends Controller {
  static cookieNames = declaredCookieNames
  connect() {
    useCookie(this, this.application.options)
  }
}

const scenarios = [
  {
    name: 'default scenario',
    fixture: fixtureBase,
    options: undefined,
    initialCookies: ''
  },
  {
    name: 'scenario with options',
    fixture: fixtureBase,
    options: { expires: 100 },
    initialCookies: ''
  },
  {
    name: 'scenario with no suffix',
    fixture: fixtureBase,
    options: { suffix: false },
    initialCookies: ''
  },
  {
    name: 'scenario without options',
    fixture: fixtureBase,
    options: { suffix: true, expires: 100 },
    initialCookies: `${declaredCookieNames[0]}=pasta; ${declaredCookieNames[1]}=pancakes`
  },
  {
    name: 'scenario with previously set cookies',
    fixture: fixtureBase,
    options: undefined,
    initialCookies: `${declaredCookieNames[0]}=pasta; ${declaredCookieNames[1]}=pancakes`
  }
]

scenarios.forEach(scenario => {
  describe(`useCookie tests scenario : ${scenario.name}`, function () {
    let application
    let controller
    let suffixValue

    beforeEach('initialize controller', async function () {
      application = Application.start()
      application.options = Object.assign({}, defaultOptions, scenario.options)

      setBrowserCookies(scenario.initialCookies)

      fixture.set(fixtureBase)
      application.register('cookie', UseLogController)
      await nextFrame()
      controller = application.controllers[0]
      suffixValue = application.options.suffix ? 'Cookie' : ''
    })

    describe(`test cookie getters in: ${scenario.name}}`, function () {
      it('returns value from browsers cookies', function () {
        UseLogController.cookieNames.forEach(cookieName => {
          const cookieValue = controller[`${cookieName}${suffixValue}`]
          expect(getCookieValue(cookieName)).to.equal(cookieValue)
        })
      })
    })

    describe(`test cookie setters in: ${scenario.name}}`, function () {
      it('stores the cookie value on the browser with default assignation', function () {
        UseLogController.cookieNames.forEach(cookieName => {
          controller[`${cookieName}${suffixValue}`] = 'updatedValue'
          expect(getCookieValue(cookieName)).to.equal('updatedValue')
        })
      })
      it('stores the cookie value on the browser with object assignation', function () {
        UseLogController.cookieNames.forEach(cookieName => {
          controller[`${cookieName}${suffixValue}`] = { value: 'updatedValue' }
          expect(getCookieValue(cookieName)).to.equal('updatedValue')
        })
      })
      it('removes the cookie from the browser', function () {
        UseLogController.cookieNames.forEach(cookieName => {
          controller[`${cookieName}${suffixValue}`] = null
          expect(getCookieValue(cookieName)).to.equal(undefined)
        })
      })
    })
  })
})
