import { IdleController } from './idle-controller'
import { extendedEvent, method } from '../support'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

interface IdleOptions {
  ms?: number
  initialState?: boolean
  events?: string[]
  withEvent?: boolean
};

export const useIdle = (controller: IdleController, options: IdleOptions = {}) => {
  const { ms = oneMinute, initialState = false, events = defaultEvents, withEvent = true } = options;

  let isIdle = initialState;
  let timeout = setTimeout(() => {
    isIdle = true
    dispatchAway();
  }, ms);

  const dispatchAway = (event: Event = new Event('away')) => {
    controller.isIdle = true;
    controller.away && method(controller, 'away').call(controller);

    if (withEvent) {
      const clickOutsideEvent = extendedEvent('away', event, controller)
      controller.element.dispatchEvent(clickOutsideEvent)
    }
  }

  const dispatchBack = (event: Event = new Event('back')) => {
    controller.isIdle = false;
    controller.back && method(controller, 'back').call(controller);

    if (withEvent) {
      const clickOutsideEvent = extendedEvent('back', event, controller)
      controller.element.dispatchEvent(clickOutsideEvent)
    }
  }

  const onEvent = (event: Event) => {
    if (isIdle) dispatchBack(event);

    isIdle = false;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      isIdle = true
      dispatchAway(event);
    }, ms);
  }

  const onVisibility = (event: Event) => {
    if (!document.hidden) onEvent(event);
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
