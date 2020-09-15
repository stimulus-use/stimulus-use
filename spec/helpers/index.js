export const nextFrame = async () => {
  return await new Promise(resolve => requestAnimationFrame(resolve))
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
