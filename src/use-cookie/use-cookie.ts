import { Controller } from '@hotwired/stimulus'
import { camelize } from '../support/index'

export interface CookieOptions {
  expires?: number
  suffix?: boolean
}

export interface Cookie extends CookieOptions {
  name: string
  value: string
}

const defaultOptions: CookieOptions = {
  expires: 30,
  suffix: true
}

export const useCookie = (controller: Controller, options: CookieOptions = {}) => {
  const { expires, suffix } = Object.assign({}, defaultOptions, options)
  const getAccessorName = (cookieName: string) => {
    return suffix ? `${camelize(cookieName)}Cookie` : camelize(cookieName)
  }

  const defineCookieAccessors = (cookieName: string) => {
    const accesorName = getAccessorName(cookieName)

    Object.defineProperty(controller, accesorName, {
      get(): any {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim())
        const matchingCookie = cookies.find(c => c.startsWith(cookieName + '='))
        return matchingCookie ? matchingCookie.split('=')[1] : undefined
      },
      set(newValue: any): any {
        if (newValue === null) {
          return clearCookie(cookieName)
        }

        const cookieValue = typeof newValue === 'string' ? newValue : newValue.value
        const cookie = parseCookieString(cookieName + '=' + cookieValue) as Cookie
        saveCookie(cookie, expires!)
      }
    })
  }

  const constructor = controller.constructor as any
  constructor.cookieNames?.forEach((cookieName: string) => {
    defineCookieAccessors(cookieName)
  })
}

function parseCookieString(nameValue: string): Cookie {
  let [cookieName, cookieValue] = nameValue.split('=')
  return {
    name: cookieName,
    value: cookieValue
  } as Cookie
}

function saveCookie(cookie: Cookie, daysToExpire: number) {
  const { name, value, expires = daysToExpire } = cookie

  const date = new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${value};expires=${date};`
}

function clearCookie(cookieName: string) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}
