import { Controller } from 'stimulus'
import { useMatchMedia } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useMatchMedia(this, {
      mediaQueries: {
        'small': '(min-width: 320px) and (max-width: 769px)',
        'tall': '(min-height: 1000px)',
        'light': '(prefers-color-scheme: light)',
        'landscape': '(orientation: landscape)'
      }
    })
  }

  smallChanged(event) { console.log('smallChanged') }
  isSmall(event) { console.log('isSmall') }
  notSmall(event) { console.log('notSmall') }

  tallChanged(event) { console.log('tallChanged') }
  isTall(event) { console.log('isTall') }
  notTall(event) { console.log('notTall') }

  lightChanged(event){ console.log('lightChanged') }
  isLight(event) { console.log('isLight') }
  notLight(event) { console.log('notLight') }

  landscapeChanged(event) { console.log('landscapeChanged') }
  isLandscape(event) { console.log('isLandscape') }
  notLandscape(event) { console.log('notLandscape') }
}
