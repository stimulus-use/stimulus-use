import { Application, Controller } from '@hotwired/stimulus'
import { useIntersection, useLazyLoad } from '../../src'
import { nextFrame, setFixture, cleanupFixture } from '../helpers'

class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  targets: Element[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    FakeIntersectionObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.push(target)
  }

  unobserve(target: Element) {
    this.targets = this.targets.filter(element => element !== target)
  }

  disconnect() {
    this.targets = []
  }

  takeRecords() {
    return []
  }

  deliver(...states: boolean[]) {
    const entries = states.map(
      isIntersecting => ({ isIntersecting, target: this.targets[0] }) as unknown as IntersectionObserverEntry
    )
    this.callback(entries, this as unknown as IntersectionObserver)
  }
}

class IntersectionLogController extends Controller {
  appearCount = 0
  disappearCount = 0

  connect() {
    useIntersection(this)
  }

  appear() {
    this.appearCount++
  }

  disappear() {
    this.disappearCount++
  }
}

class LazyLoadLogController extends Controller {
  loadingSrc?: string

  connect() {
    useLazyLoad(this)
  }

  loading(src: string) {
    this.loadingSrc = src
  }
}

describe('IntersectionObserver batches with several entries for the same element', function () {
  const OriginalIntersectionObserver = window.IntersectionObserver
  let application: Application

  beforeEach(async function () {
    FakeIntersectionObserver.instances = []
    window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver

    setFixture(`
      <div data-controller="intersection" id="intersection"></div>
      <img data-controller="lazy-load" data-lazy-load-src="/image.png" id="lazy-load" />
    `)

    application = Application.start()
    application.register('intersection', IntersectionLogController)
    application.register('lazy-load', LazyLoadLogController)
    await nextFrame()
  })

  afterEach(async function () {
    cleanupFixture()
    application.stop()
    window.IntersectionObserver = OriginalIntersectionObserver
    await nextFrame()
  })

  const intersectionController = () =>
    application.getControllerForElementAndIdentifier(
      document.getElementById('intersection')!,
      'intersection'
    ) as IntersectionLogController

  const lazyLoadController = () =>
    application.getControllerForElementAndIdentifier(
      document.getElementById('lazy-load')!,
      'lazy-load'
    ) as LazyLoadLogController

  const observerFor = (id: string) =>
    FakeIntersectionObserver.instances.find(observer => observer.targets[0]?.id === id)!

  it('useIntersection fires "appear" when the latest entry is intersecting', function () {
    observerFor('intersection').deliver(false, true)

    expect(intersectionController().appearCount).to.equal(1)
    expect(intersectionController().disappearCount).to.equal(0)
    expect(document.getElementById('intersection')!.hasAttribute('isVisible')).to.equal(true)
  })

  it('useIntersection fires "disappear" when the latest entry is not intersecting', function () {
    observerFor('intersection').deliver(true)
    observerFor('intersection').deliver(true, false)

    expect(intersectionController().appearCount).to.equal(1)
    expect(intersectionController().disappearCount).to.equal(1)
    expect(document.getElementById('intersection')!.hasAttribute('isVisible')).to.equal(false)
  })

  it('useLazyLoad loads when the latest entry is intersecting', function () {
    observerFor('lazy-load').deliver(false, true)

    expect(lazyLoadController().loadingSrc).to.equal('/image.png')
  })
})
