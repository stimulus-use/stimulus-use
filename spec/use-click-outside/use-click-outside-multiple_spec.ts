import { Application } from '@hotwired/stimulus'
import { nextFrame, classList, click, setFixture } from '../helpers'
import DropdownController from './dropdown_controller'

// https://github.com/stimulus-use/stimulus-use/issues/193
describe(`useClickOutside with multiple instances`, function () {
  let application

  const isOpen = (selector: string) => !classList(selector).includes('hidden')

  beforeAll(async function () {
    application = Application.start()

    setFixture(`
      <div data-controller="dropdown" id="account">
        <button id="account-toggle" data-action="dropdown#toggle">Account</button>
        <div data-dropdown-target="menu" id="account-menu" class="hidden"></div>
      </div>
      <div data-controller="dropdown" id="help">
        <button id="help-toggle" data-action="dropdown#toggle">Help</button>
        <div data-dropdown-target="menu" id="help-menu" class="hidden"></div>
      </div>
    `)

    application.register('dropdown', DropdownController)

    await nextFrame()
  })

  afterAll(async function () {
    await application.stop()
  })

  it('keeps only one menu open — opening one closes the others', async function () {
    await click('#account-toggle')
    expect(isOpen('#account-menu')).to.equal(true)
    expect(isOpen('#help-menu')).to.equal(false)

    await click('#help-toggle')
    expect(isOpen('#account-menu')).to.equal(false)
    expect(isOpen('#help-menu')).to.equal(true)

    await click('#account-toggle')
    expect(isOpen('#account-menu')).to.equal(true)
    expect(isOpen('#help-menu')).to.equal(false)
  })
})
