import { Controller } from 'stimulus'

export interface ThrottleOptions {
  wait?: number
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

export const useThrottle = (controller: Controller, options: ThrottleOptions) => {
  (controller.constructor as any).throttles?.forEach((funcName: string) => {
    (controller as any)[funcName] = throttle((controller as any)[funcName] as Function, options?.wait)
  })
}
