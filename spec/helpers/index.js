export const nextFrame = async () => {
  return await new Promise(resolve => requestAnimationFrame(resolve))
}

export class TestLogger {
  constructor() {
    this.logs = []
  }

  clear() {
    this.logs = []
  }

  log(entry) {
    this.logs.push(entry)
  }

  eventsById(id) {
    return this.logs.filter(entry => entry.id === id)
  }
}
