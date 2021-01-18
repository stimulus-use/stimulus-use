import { Controller } from 'stimulus'

export interface ThrottleOptions {
  wait?: number
  name?: string
}

class ThrottleController extends Controller {
  static throttles: string[] | ThrottleOptions[] = []
}

const defaultWait = 200

export function throttle(func: Function, wait: number = defaultWait): Function {
  let inThrottle: boolean;

  return function (this: any): any {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      inThrottle = true;
      func.apply(context, args);
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

export const useThrottle = (controller: ThrottleController, options: ThrottleOptions) => {
  const constructor = controller.constructor as any

  constructor.throttles?.forEach((func: string | ThrottleOptions) => {
    if (typeof func === "string") {
      (controller as any)[func] = throttle((controller as any)[func] as Function, options?.wait)
    }

    if (typeof func === "object") {
      const { name, wait } = func as ThrottleOptions
      if (!name) return
      (controller as any)[name] = throttle((controller as any)[name] as Function, wait || options?.wait)
    }
  })
}
