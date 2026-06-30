import { beforeAll, afterAll, beforeEach as vitestBeforeEach, afterEach as vitestAfterEach } from 'vitest'

const withOptionalLabel = hook => (labelOrFn, maybeFn) => hook(typeof labelOrFn === 'function' ? labelOrFn : maybeFn)

globalThis.before = withOptionalLabel(beforeAll)
globalThis.after = withOptionalLabel(afterAll)
globalThis.beforeEach = withOptionalLabel(vitestBeforeEach)
globalThis.afterEach = withOptionalLabel(vitestAfterEach)

const fixtureFiles = import.meta.glob('../fixtures/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
})

const fixtureContents = {}

for (const path in fixtureFiles) {
  fixtureContents[path.split('/').pop()] = fixtureFiles[path]
}

let container = null

const ensureContainer = () => {
  if (!container || !container.isConnected) {
    container = document.createElement('div')
    container.id = 'fixture'
    document.body.appendChild(container)
  }

  return container
}

globalThis.fixture = {
  set(html) {
    ensureContainer().innerHTML = html
    return container
  },

  load(name) {
    const html = fixtureContents[name]

    if (html == null) {
      throw new Error(`Fixture not found: ${name} (available: ${Object.keys(fixtureContents).join(', ')})`)
    }

    return this.set(html)
  },

  cleanup() {
    if (container) container.innerHTML = ''
  }
}
