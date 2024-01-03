import { Controller, Application } from '@hotwired/stimulus'
import { useCookie } from '../../src'
import { nextFrame } from '../helpers'
import { expect } from 'chai'
import { fixtureBase } from './fixtures'
import { getCookieValue, getCookieCount, getCookies, setInitialCookies } from './helpers'

class UseLogController extends Controller {
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
    name: 'scenario without options',
    fixture: fixtureBase,
    options: undefined,
    initialCookies: ''
  },
  {
    name: 'scenario with previously set cookies',
    fixture: fixtureBase,
    options: undefined,
    initialCookies: 'food=pasta; breakfast=pancakes'
  }
]

scenarios.forEach(scenario => {
  describe(`CookieController tests scenario : ${scenario.name}`, function() {
    let application
    let initialCookiesCount
    let controller

    beforeEach('initialize controller', async function() {
      application = Application.start()
      application.options = scenario.options
      setInitialCookies(scenario.initialCookies)
      initialCookiesCount = getCookieCount()

      fixture.set(fixtureBase)
      application.register('cookie', UseLogController)
      await nextFrame()
      controller = application.controllers[0]
    })

    describe(`reads previous cookies in: ${scenario.name}}`, function() {
      it('from browsers current cookies', function() {
        getCookies().forEach(cookie => {
          const [cookieName, cookieValue] = cookie;

          const cookieGetterValue = controller[`${cookieName}Cookie`];
          expect(cookieValue).to.equal(cookieGetterValue)
        })
      })
    })


    describe('setCookie', function() {
      const cookieName = "colorscheme"
      const cookieValue = "dark"

      describe(`sets a new cookie in: ${scenario.name}`, function() {
        it('from a cookie object', function() {
          expect(getCookieValue(cookieName)).to.equal(null)
          controller.setCookie({ name: cookieName, value: cookieValue })
          expect(getCookieValue(cookieName)).to.equal(cookieValue)
          expect(getCookieCount()).to.equal(1 + initialCookiesCount)
        })

        it('from strings (cookieName, cookieValue) ', function() {
          expect(getCookieValue(cookieName)).to.equal(null)
          controller.setCookie(cookieName, cookieValue)
          expect(getCookieValue(cookieName)).to.equal(cookieValue)
          expect(getCookieCount()).to.equal(1 + initialCookiesCount)
        })
      })

      describe(`overrides existing cookie: ${scenario.name}`, function() {
        it('from a cookie object', function() {
          expect(getCookieValue(cookieName)).to.equal(null)
          controller.setCookie({ name: cookieName, value: cookieValue })
          expect(getCookieValue(cookieName)).to.equal(cookieValue)
          controller.setCookie({ name: cookieName, value: "light" })
          expect(getCookieValue(cookieName)).to.equal("light")
        })

        it('from strings (cookieName, cookieValue) ', function() {
          expect(getCookieValue(cookieName)).to.equal(null)
          controller.setCookie(cookieName, cookieValue)
          expect(getCookieValue(cookieName)).to.equal(cookieValue)
          expect(getCookieCount()).to.equal(1 + initialCookiesCount)
        })
      })

      describe(`clearCookie API: ${scenario.name}`, function() {
        it('removes cookie', function() {
          controller.setCookie(cookieName, cookieValue)
          expect(getCookieCount()).to.equal(1 + initialCookiesCount)

          controller.clearCookie(cookieName);
          expect(getCookieCount()).to.equal(initialCookiesCount)
        })
      })
    })
  })
})
