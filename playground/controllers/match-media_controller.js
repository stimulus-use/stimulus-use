import { Controller } from 'stimulus'
import { useMatchMedia } from 'stimulus-use'

export default class extends Controller {
  static targets = ['small', 'tall', 'light', 'landscape', 'smallCount', 'tallCount', 'lightCount', 'landscapeCount']

  static values = {
    smallCount: Number,
    tallCount: Number,
    lightCount: Number,
    landscapeCount: Number
  }

  connect() {
    useMatchMedia(this, {
      mediaQueries: {
        small: '(min-width: 320px) and (max-width: 769px)',
        tall: '(min-height: 1000px)',
        light: '(prefers-color-scheme: light)',
        landscape: '(orientation: landscape)'
      }
    })

    this.smallCountValue = 0
    this.tallCountValue = 0
    this.lightCountValue = 0
    this.landscapeCountValue = 0
  }

  smallChanged(event) {
    this.smallCountValue++
    console.log('smallChanged', event)
  }
  isSmall(event) {
    this.smallTarget.textContent = 'is small'
    console.log('isSmall', event)
  }
  notSmall(event) {
    this.smallTarget.textContent = 'not small'
    console.log('notSmall', event)
  }

  tallChanged(event) {
    this.tallCountValue++
    console.log('tallChanged', event)
  }
  isTall(event) {
    this.tallTarget.textContent = 'is tall'
    console.log('isTall', event)
  }
  notTall(event) {
    this.tallTarget.textContent = 'not tall'
    console.log('notTall', event)
  }

  lightChanged(event) {
    this.lightCountValue++
    console.log('lightChanged', event)
  }
  isLight(event) {
    this.lightTarget.textContent = 'is light'
    console.log('isLight', event)
  }
  notLight(event) {
    this.lightTarget.textContent = 'not light'
    console.log('notLight', event)
  }

  landscapeChanged(event) {
    this.landscapeCountValue++
    console.log('landscapeChanged', event)
  }
  isLandscape(event) {
    this.landscapeTarget.textContent = 'is landscape'
    console.log('isLandscape', event)
  }
  notLandscape(event) {
    this.landscapeTarget.textContent = 'not landscape'
    console.log('notLandscape', event)
  }

  smallCountValueChanged() {
    this.smallCountTarget.textContent = this.smallCountValue
  }
  tallCountValueChanged() {
    this.tallCountTarget.textContent = this.tallCountValue
  }
  lightCountValueChanged() {
    this.lightCountTarget.textContent = this.lightCountValue
  }
  landscapeCountValueChanged() {
    this.landscapeCountTarget.textContent = this.landscapeCountValue
  }
}
