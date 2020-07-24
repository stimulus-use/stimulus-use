import { IdleController } from './idle-controller'

const defaultEvents = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
const oneMinute = 60e3;

export const useIdle = (controller: IdleController, ms: number = oneMinute, initialState: boolean = false, events: string[] = defaultEvents) => {
  let isIdle = initialState;
  let timeout = setTimeout(() => {
    isIdle = true
    dispatchIdle();
  }, ms);

  const method = (methodName: string): Function => {
    const method = (controller as any)[methodName]
    if (typeof method == 'function') {
      return method
    }
    throw new Error(`undefined method "${methodName}"`)
  }

  const dispatchIdle = () => {
    controller.isIdle = true;
    controller.idle && method('idle').call(controller);
  }

  const dispachReturned = () => {
    controller.isIdle = false;
    controller.returned && method('returned').call(controller);
  }

  const onEvent = () => {
    if (isIdle) dispachReturned();

    isIdle = false;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      isIdle = true
      dispatchIdle();
    }, ms);
  }

  const onVisibility = () => {
    if (!document.hidden) onEvent();
  };

  if (isIdle) {
    dispatchIdle();
  } else {
    dispachReturned();
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
