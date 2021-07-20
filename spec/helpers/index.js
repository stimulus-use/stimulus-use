export const nextFrame = async () => {
  return new Promise(resolve => requestAnimationFrame(resolve))
}

export function delay(ms = 1) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const click = async selector => {
  document.querySelector(selector).click()
  return nextFrame()
}

export const remove = async selector => {
  document.querySelector(selector).remove()
  return nextFrame()
}

export const classList = selector => {
  return document.querySelector(selector).classList.toString()
}

export const addAttribute = selector => {
  return document.querySelector(selector).classList.toString()
}

export const keyDown = (selector, keyboardEventInit) => {
  document.querySelector(selector).dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...keyboardEventInit }))
  return nextFrame()
}

export const keyUp = (selector, keyboardEventInit) => {
  document.querySelector(selector).dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, ...keyboardEventInit }))
  return nextFrame()
}

export class TestLogger {
  logs = []

  clear() {
    this.logs = []
  }

  log(entry) {
    this.logs.push(entry)
  }

  eventsById(id) {
    return this.logs.filter(entry => entry.id === id)
  }

  eventsFilter(keys) {
    return filterByKeys(this.logs, keys)
  }
}

const filterByKeys = (array, keys) => {
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
