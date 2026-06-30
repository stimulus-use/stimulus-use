import { delay } from '../helpers'
import { debounce } from '../../src'

const wait = 60
const settle = () => delay(wait + 20)

describe('debounce() leading/trailing edges', function () {
  it('trailing-only by default: a burst fires once, on the trailing edge', async function () {
    let calls = 0
    const fn = debounce(() => calls++, wait)

    fn()
    fn()
    fn()
    expect(calls).to.equal(0)
    await settle()
    expect(calls).to.equal(1)
  })

  it('leading + trailing: a burst fires twice, a lone call once', async function () {
    let calls = 0
    const fn = debounce(() => calls++, wait, { leading: true })

    fn()
    fn()
    fn()
    expect(calls).to.equal(1)
    await settle()
    expect(calls).to.equal(2)

    fn()
    expect(calls).to.equal(3)
    await settle()
    expect(calls).to.equal(3)
  })

  it('leading-only (trailing: false): never fires on the trailing edge', async function () {
    let calls = 0
    const fn = debounce(() => calls++, wait, { leading: true, trailing: false })

    fn()
    fn()
    fn()
    expect(calls).to.equal(1)
    await settle()
    expect(calls).to.equal(1)

    fn()
    expect(calls).to.equal(2)
    await settle()
    expect(calls).to.equal(2)
  })

  it('leading: false, trailing: false never invokes', async function () {
    let calls = 0
    const fn = debounce(() => calls++, wait, { leading: false, trailing: false })

    fn()
    fn()
    await settle()
    expect(calls).to.equal(0)
  })
})
