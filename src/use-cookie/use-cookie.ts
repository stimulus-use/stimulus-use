import { Controller } from '@hotwired/stimulus'
import { camelize } from '../support/index'

export interface CookieOptions {
  expires: number
};

export interface Cookie extends CookieOptions {
  name: string
  value: string
}

function parseCookieString(nameValue: string): Cookie {
  let [cookieName, cookieValue] = nameValue.split('=')
  return {
    name: cookieName,
    value: cookieValue
  } as Cookie
}

function saveCookie(cookie: Cookie, daysToExpire: number) {
  const {
    name,
    value,
    expires = daysToExpire
  } = cookie

  const date = new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value};expires=${date};`
}

export const useCookie = (controller: Controller, options: CookieOptions = { expires: 30 }) => {
  // Set up initial cookies from browser
  if (document.cookie.length > 0) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    cookies.forEach(cookieString => {
      defineCookieGetter(parseCookieString(cookieString))
    })
  }

  function defineCookieGetter(cookie: Cookie) {
    const getterName = camelize(cookie.name) + "Cookie"
    if (controller.hasOwnProperty(getterName)) { return }

    Object.defineProperty(controller, getterName, {
      get(): any {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const matchingCookie = cookies.find(c => c.startsWith(cookie.name + '='));
        return matchingCookie ? matchingCookie.split('=')[1] : undefined;
      },
      configurable: true
    })
  }

  // setCookie API
  Object.defineProperty(controller, 'setCookie', {
    value: setCookie,
    writable: false,
    configurable: false,
    enumerable: true,
  })

  function setCookie(cookie: Cookie | string, cookieValue?: string) {
    if (typeof cookie === 'string') {
      cookie = parseCookieString(cookie + '=' + cookieValue) as Cookie
    }
    if (cookie.name === '') { return false }

    saveCookie(cookie, options.expires)
    defineCookieGetter(cookie)
  }

  // clearCookie API
  Object.defineProperty(controller, 'clearCookie', {
    value: clearCookie,
    writable: false,
    configurable: false,
    enumerable: true,
  })

  function clearCookie(cookieName: string) {
    const getterName = camelize(cookieName) + "Cookie"
    if (getterName in controller) {
      delete (controller as any)[getterName];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
  }
}
