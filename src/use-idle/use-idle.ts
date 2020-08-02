import { IdleController } from './idle-controller'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

interface IdleOptions {
  ms?: number
  initialState?: boolean
  events?: string[]
};

export const useIdle = (controller: IdleController, options: IdleOptions = {}) => {
  const { ms = oneMinute, initialState = false, events = defaultEvents } = options;

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

  const controllerDisconnect = controller.disconnect

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
      controllerDisconnect();
    },
  })

  controller.observe()
}
