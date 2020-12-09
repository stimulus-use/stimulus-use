import { Controller, Application } from 'stimulus'
import { useMeta } from '../../src'
import { nextFrame } from '../helpers'
import { expect } from 'chai'
import { fixtureBase } from './fixtures'

const application = Application.start()

class UseLogController extends Controller {
  static metaNames = ['userId', 'ko', 'true', 'false', 'email', 'object', 'some_id', 'kebab-id']

  initialize() {
    useMeta(this)
  }
}

describe(`useMeta tests`, function () {
  beforeEach('initialize controller', async function () {
    fixture.set(fixtureBase)
    application.register('meta', UseLogController)
    await nextFrame()
  })

  describe('test meta getters', function () {
    it('returns a cast value of the meta', function () {
      const initalHead = document.head.innerHTML
      document.head.innerHTML += '<meta name="userId" content="12345678">'
      document.head.innerHTML += '<meta name="true" content="true">'
      document.head.innerHTML += '<meta name="false" content="false">'
      document.head.innerHTML += '<meta name="email" content="joe@doe.com">'
      expect(application.controllers[0].userId).to.equal(12345678)
      expect(application.controllers[0].true).to.equal(true)
      expect(application.controllers[0].false).to.equal(false)
      expect(application.controllers[0].ko).to.equal(null)
      expect(application.controllers[0].email).to.equal('joe@doe.com')
      document.head.innerHTML = initalHead
    })
  })

  describe('test lower snake case', function () {
    it('the getter is camelized', function () {
      const initalHead = document.head.innerHTML
      document.head.innerHTML += '<meta name="some_id" content="12345678">'
      document.head.innerHTML += '<meta name="kebab-id" content="12345678">'

      expect(application.controllers[0].someId).to.equal(12345678)
      expect(application.controllers[0].kebabId).to.equal(12345678)
      document.head.innerHTML = initalHead
    })
  })

  describe('test metas getter', function () {
    it('returns an object with all metas', function () {
      const initalHead = document.head.innerHTML

      document.head.innerHTML += '<meta name="userId" content="12345678">'
      document.head.innerHTML += '<meta name="true" content="true">'
      document.head.innerHTML += '<meta name="false" content="false">'
      document.head.innerHTML += '<meta name="email" content="joe@doe.com">'
      document.head.innerHTML += `<meta name="object" content='${JSON.stringify({ id: 123 })}'>`
      const metas = {
        userId: 12345678,
        true: true,
        false: false,
        email: 'joe@doe.com',
        object: {
          id: 123
        }
      }
      expect(application.controllers[0].metas).to.deep.equal(metas)
      document.head.innerHTML = initalHead
    })
  })
})
