export const nextFrame = async (): Promise<void> => {
  return new Promise(resolve => requestAnimationFrame(() => resolve()))
}

export function delay(ms = 1): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const query = (selector: string): Element => {
  const element = document.querySelector(selector)
  if (!element) throw new Error(`No element found for selector "${selector}"`)
  return element
}

export const click = async (selector: string) => {
  ;(query(selector) as HTMLElement).click()
  return nextFrame()
}

export const remove = async (selector: string) => {
  query(selector).remove()
  return nextFrame()
}

export const classList = (selector: string) => {
  return query(selector).classList.toString()
}

export const addAttribute = (selector: string) => {
  return query(selector).classList.toString()
}

export const keyDown = (selector: string, keyboardEventInit?: KeyboardEventInit) => {
  query(selector).dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...keyboardEventInit }))
  return nextFrame()
}

export const keyUp = (selector: string, keyboardEventInit?: KeyboardEventInit) => {
  query(selector).dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, ...keyboardEventInit }))
  return nextFrame()
}

const fixtureFiles = import.meta.glob('../fixtures/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

const fixtureContents: Record<string, string> = {}
for (const path in fixtureFiles) {
  fixtureContents[path.split('/').pop() as string] = fixtureFiles[path]
}

let fixtureContainer: HTMLElement | null = null

const ensureFixtureContainer = (): HTMLElement => {
  if (!fixtureContainer || !fixtureContainer.isConnected) {
    fixtureContainer = document.createElement('div')
    fixtureContainer.id = 'fixture'
    document.body.appendChild(fixtureContainer)
  }

  return fixtureContainer
}

export const setFixture = (html: string): HTMLElement => {
  const container = ensureFixtureContainer()
  container.innerHTML = html
  return container
}

export const loadFixture = (name: string): HTMLElement => {
  const html = fixtureContents[name]

  if (html == null) {
    throw new Error(`Fixture not found: ${name} (available: ${Object.keys(fixtureContents).join(', ')})`)
  }

  return setFixture(html)
}

export const cleanupFixture = (): void => {
  if (fixtureContainer) fixtureContainer.innerHTML = ''
}

export type LogEntry = Record<string, any>
export type LogFilter = Record<string, any[]>

export class TestLogger {
  logs: LogEntry[] = []

  clear() {
    this.logs = []
  }

  log(entry: LogEntry) {
    this.logs.push(entry)
  }

  eventsById(id: unknown) {
    return this.logs.filter(entry => entry.id === id)
  }

  eventsFilter(keys: LogFilter) {
    return filterByKeys(this.logs, keys)
  }
}

const filterByKeys = (array: LogEntry[], keys: LogFilter) => {
  const filterKeys = Object.keys(keys)
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores an empty filter
      if (!keys[key].length) return true
      return keys[key].find(filter => filter === item[key])
    })
  })
}
