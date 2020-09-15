import { Controller } from 'stimulus'
import { useIntersection, useResize } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIntersection(this)
    useResize(this)
  }

  appear(entry) {
    // new callback whenever the element appears.
    // entry is an IntersectionObserverEntry
  }

  disappear(entry) {
    // new callback whenever the element disappears.
  }

  resize({ width, height }) {
    // callback whenever the element gets resized
  }
}

//user_controller.js
import { Controller } from 'stimulus'
import { useIdle } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useIdle(this)
  }

  away(event) {
    alert('Hey, wake up!')
  }

  back(event) {
    alert('Welcome back!')
  }
}

//video_controller
export default class extends Controller {
  connect() {
    useVisible(this)
    this.player = new VideoPlayer()
  }

  visible() {
    this.player.play()
  }

  invisible() {
    this.player.pause()
  }
}
