import { Controller } from 'stimulus'
// import { method, extendedEvent, isElementInViewport, composeEventName } from '../support/index'

interface TransitionController extends Controller {
  show: (event: Event) => void
  hide: (event: Event) => void
  toggle: (event: Event) => void
  isOpen: boolean
}

export interface TransitionOptions {
  element?: Element
  dispatchEvent?: boolean
  open?: boolean
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
  open: false,
  hiddenClass: "hidden"
}

export const useTransition = (controller: TransitionController, options: TransitionOptions = {}) => {
  const { open, hiddenClass } = Object.assign(defaultOptions, options)
  const targetElement = options?.element || controller.element
  if (!((targetElement instanceof HTMLElement) || (targetElement instanceof SVGElement))) return
  const dataset = targetElement.dataset

  const controllerShow: Function = controller.show?.bind(controller)
  const controllerHide: Function = controller.hide?.bind(controller)
  const controllerToggle: Function = controller.toggle?.bind(controller)

  async function show(event?: Event) {
    if (controller.isOpen) return

    controller.isOpen = true
    controllerShow && controllerShow(event)

    const enterClass = getAttribute("enter", options, dataset)
    const enterActiveClass = getAttribute("enterActive", options, dataset)
    const enterToClass = getAttribute("enterTo", options, dataset)

    if (!!hiddenClass) {
      targetElement.classList.remove(hiddenClass)
    }

    await transition(targetElement, enterClass, enterActiveClass, enterToClass)

  }

  async function hide(event?: Event) {
    if (!controller.isOpen) return

    controller.isOpen = false
    controllerHide && controllerHide(event)

    const leaveClass = getAttribute("leave", options, dataset)
    const leaveActiveClass = getAttribute("leaveActive", options, dataset)
    const leaveToClass = getAttribute("leaveTo", options, dataset)

    await transition(targetElement, leaveClass, leaveActiveClass, leaveToClass)

    if (!!hiddenClass) {
      targetElement.classList.add(hiddenClass)
    }
  }

  function toggle(event: Event) {
    controllerToggle && controllerToggle(event)
    if (controller.isOpen) {
      hide()
    } else {
      show()
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
    if (open) {
      if (!!hiddenClass) {
        targetElement.classList.remove(hiddenClass)
      }
      show()
    } else {
      if (!!hiddenClass) {
        targetElement.classList.add(hiddenClass)
      }
      hide()
    }
  }

  initialState()
  Object.assign(controller, { show, hide, toggle })
}

function getAttribute(name: string, options: TransitionOptions, dataset: DOMStringMap) {
  const datasetName = `transition${name[0].toUpperCase()}${name.substr(1)}`
  const datasetAlpineName = (alpineNames as any)[name]
  const classes = (options as any)[name] || dataset[datasetName] || dataset[datasetAlpineName] || ""
  return classes.split(" ")
}

async function afterTransition(element: Element): Promise<Function> {
  return new Promise(resolve => {
    const duration = Number(
      getComputedStyle(element)
        .transitionDuration
        .split(",")[0]
        .replace('s', '')
    ) * 1000

    setTimeout(() => {
      resolve()
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
