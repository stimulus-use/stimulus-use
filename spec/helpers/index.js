export const nextFrame = async () => {
  return await new Promise(resolve => requestAnimationFrame(resolve))
}

export const click = async selector => {
  fixture.el.querySelector(selector).click()
  return nextFrame()
}

export const remove = async selector => {
  fixture.el.querySelector(selector).remove()
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
