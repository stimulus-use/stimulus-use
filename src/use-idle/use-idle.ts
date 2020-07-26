import { IdleController } from './idle-controller'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

export const useIdle = (controller: IdleController, ms: number = oneMinute, initialState: boolean = false, events: string[] = defaultEvents) => {
  let isIdle = initialState;
  let timeout = setTimeout(() => {
    isIdle = true
    dispatchAway();
  }, ms);

  const method = (methodName: string): Function => {
    const method = (controller as any)[methodName]
    if (typeof method == 'function') {
      return method
    }
    throw new Error(`undefined method "${methodName}"`)
  }

  const dispatchAway = () => {
    controller.isIdle = true;
    controller.away && method('away').call(controller);
  }

  const dispatchBack = () => {
    controller.isIdle = false;
    controller.back && method('back').call(controller);
  }

  const onEvent = () => {
    if (isIdle) dispatchBack();

    isIdle = false;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      isIdle = true
      dispatchAway();
    }, ms);
  }

  const onVisibility = () => {
    if (!document.hidden) onEvent();
  };

  if (isIdle) {
    dispatchAway();
  } else {
    dispatchBack();
  }

  Object.assign(controller, {
    observe() {
      events.forEach(event => {
        window.addEventListener(event, onEvent);
      });
      document.addEventListener('visibilitychange', onVisibility);
    },
    unObserve() {
      events.forEach(event => {
        window.removeEventListener(event, onEvent);
      });
      document.removeEventListener('visibilitychange', onVisibility);
    },
    disconnect() {
      this.unObserve();
      controller.disconnect();
    },
  })

  controller.observe()
}