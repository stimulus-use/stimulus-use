import { Controller } from 'stimulus'
import { useMemo } from 'stimulus-use'

export default class extends Controller {
  static memos = ['a', 'b']

  connect() {
    useMemo(this)

    console.log(this.a)
    console.log(this.b)
    console.log(this.c)

    console.log(this.a)
    console.log(this.b)
    console.log(this.c)
  }

  get a() {
    console.log('getting a')
    return 1
  }

  get b() {
    console.log('getting b')
    return 2
  }

  get c() {
    console.log('getting c')
    return 3
  }
}
