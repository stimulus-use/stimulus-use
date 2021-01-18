import { TransitionComposableController, TransitionController } from './transition-controller'

export interface TransitionOptions {
  element?: Element
  dispatchEvent?: boolean
  transitioned?: boolean
  eventPrefix?: boolean | string
  enter?: string
  enterActive?: string
  enterTo?: string
  leave?: string
  leaveActive?: string
  leaveTo?: string
  hiddenClass?: string
}

const alpineNames: object = {
  enterClass: "enter",
  enterActiveClass: "enterStart",
  enterToClass: "enterEnd",
  leaveClass: "leave",
  leaveActiveClass: "leaveStart",
  leaveToClass: "leaveEnd",
}

const defaultOptions = {
  dispatchEvent: true,
  eventPrefix: true,
  transitioned: false,
  hiddenClass: "hidden"
}

export const useTransition = (controller: TransitionComposableController, options: TransitionOptions = {}) => {
  const targetName = (controller.element as HTMLElement).dataset.transitionTarget
  let targetFromAttribute

  if (targetName) {
    targetFromAttribute = (controller as any)[`${targetName}Target`]
  }

  const targetElement = options?.element || targetFromAttribute || controller.element

  // data attributes are only available on HTMLElement and SVGElement
  if (!((targetElement instanceof HTMLElement) || (targetElement instanceof SVGElement))) return
  const dataset = targetElement.dataset

  const { transitioned, hiddenClass } = Object.assign(defaultOptions, options)

  const controllerEnter: Function = controller.enter?.bind(controller)
  const controllerLeave: Function = controller.leave?.bind(controller)
  const controllerToggleTransition: Function = controller.toggleTransition?.bind(controller)

  async function enter(event?: Event) {
    if (controller.transitioned) return

    controller.transitioned = true
    controllerEnter && controllerEnter(event)

    const enterClass = getAttribute("enter", options, dataset)
    const enterActiveClass = getAttribute("enterActive", options, dataset)
    const enterToClass = getAttribute("enterTo", options, dataset)

    if (!!hiddenClass) {
      targetElement.classList.remove(hiddenClass)
    }

    await transition(targetElement, enterClass, enterActiveClass, enterToClass)

  }

  async function leave(event?: Event) {
    if (!controller.transitioned) return
    controller.transitioned = false
    controllerLeave && controllerLeave(event)

    const leaveClass = getAttribute("leave", options, dataset)
    const leaveActiveClass = getAttribute("leaveActive", options, dataset)
    const leaveToClass = getAttribute("leaveTo", options, dataset)

    await transition(targetElement, leaveClass, leaveActiveClass, leaveToClass)

    if (!!hiddenClass) {
      targetElement.classList.add(hiddenClass)
    }
  }

  function toggleTransition(event: Event) {
    controllerToggleTransition && controllerToggleTransition(event)

    if (controller.transitioned) {
      leave()
    } else {
      enter()
    }
  }

  async function transition(element: Element, initialClass: string[], activeClass: string[], toClass: string[]) {
    element.classList.add(...initialClass);
    element.classList.add(...activeClass);
    await nextFrame();

    element.classList.remove(...activeClass);
    element.classList.add(...toClass);

    await afterTransition(element);

    element.classList.remove(...initialClass);
  }

  function initialState() {
    controller.transitioned = transitioned
    if (transitioned) {
      if (!!hiddenClass) {
        targetElement.classList.remove(hiddenClass)
      }
      enter()
    } else {
      if (!!hiddenClass) {
        targetElement.classList.add(hiddenClass)
      }
      leave()
    }
  }

  initialState()
  Object.assign(controller, { enter, leave, toggleTransition })
  return [enter, leave, toggleTransition]
}

function getAttribute(name: string, options: TransitionOptions, dataset: DOMStringMap) {
  const datasetName = `transition${name[0].toUpperCase()}${name.substr(1)}`
  const datasetAlpineName = (alpineNames as any)[name]
  const classes = (options as any)[name] || dataset[datasetName] || dataset[datasetAlpineName] || ""
  return classes.split(" ")
}

async function afterTransition(element: Element): Promise<number> {
  return new Promise(resolve => {
    const duration = Number(
      getComputedStyle(element)
        .transitionDuration
        .split(",")[0]
        .replace('s', '')
    ) * 1000

    setTimeout(() => {
      resolve(duration)
    }, duration)
  });
}

async function nextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
