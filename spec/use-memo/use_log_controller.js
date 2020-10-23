import { Controller } from 'stimulus'
import { useMemo } from '../../src'

export default class UseLogController extends Controller {
  static memos = ['a', 'b']

  connect() {
    useMemo(this)

    this.a
    this.b
    this.c

    this.a
    this.b
    this.c
  }

  get a() {
    this.application.testLogger.log({ type: 'getter:invoke', name: 'a' })
    return 1
  }

  get b() {
    this.application.testLogger.log({ type: 'getter:invoke', name: 'b' })
    return 2
  }

  get c() {
    this.application.testLogger.log({ type: 'getter:invoke', name: 'c' })
    return 3
  }
}
