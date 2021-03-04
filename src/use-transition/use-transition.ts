import { TransitionComposableController } from './transition-controller'

export interface TransitionOptions {
  element?: Element
  transitioned?: boolean
  enter?: string
  enterActive?: string
  enterTo?: string
  leave?: string
  leaveActive?: string
  leaveTo?: string
  hiddenClass?: string
  leaveAfter?: number
  preserveOriginalClass?: boolean
  removeToClasses?: boolean
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
  transitioned: false,
  hiddenClass: "hidden",
  preserveOriginalClass: true,
  removeToClasses: true
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

  const leaveAfter = parseInt(dataset.leaveAfter || "") || options.leaveAfter || 0

  const { transitioned, hiddenClass, preserveOriginalClass, removeToClasses } = Object.assign(defaultOptions, options)

  const controllerEnter = controller.enter?.bind(controller)
  const controllerLeave = controller.leave?.bind(controller)
  const controllerToggleTransition = controller.toggleTransition?.bind(controller)

  async function enter(event?: Event) {
    if (controller.transitioned) return

    controller.transitioned = true
    controllerEnter && controllerEnter(event)

    const enterClasses = getAttribute("enter", options, dataset)
    const enterActiveClasses = getAttribute("enterActive", options, dataset)
    const enterToClasses = getAttribute("enterTo", options, dataset)
    const leaveToClasses = getAttribute("leaveTo", options, dataset)

    if (!!hiddenClass) {
      targetElement.classList.remove(hiddenClass)
    }

    if (!removeToClasses) {
      removeClasses(targetElement, leaveToClasses)
    }
    await transition(targetElement, enterClasses, enterActiveClasses, enterToClasses, hiddenClass, preserveOriginalClass, removeToClasses)

    if (leaveAfter > 0) {
      setTimeout(() => {
        leave(event)
        console.log("after");
      }, leaveAfter)
    }
  }

  async function leave(event?: Event) {
    if (!controller.transitioned) return
    controller.transitioned = false
    controllerLeave && controllerLeave(event)

    const leaveClasses = getAttribute("leave", options, dataset)
    const leaveActiveClasses = getAttribute("leaveActive", options, dataset)
    const leaveToClasses = getAttribute("leaveTo", options, dataset)
    const enterToClasses = getAttribute("enterTo", options, dataset)

    if (!removeToClasses) {
      removeClasses(targetElement, enterToClasses)
    }

    await transition(targetElement, leaveClasses, leaveActiveClasses, leaveToClasses, hiddenClass, preserveOriginalClass, removeToClasses)

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

  async function transition(element: Element, initialClasses: string[], activeClasses: string[], endClasses: string[], hiddenClass: string, preserveOriginalClass: boolean, removeEndClasses: boolean) {

    // if there's any overlap between the current set of classes and initialClasses/activeClasses/endClasses,
    // we should remove them before we start and add them back at the end
    const stashedClasses: string[] = []
    if (preserveOriginalClass) {
      initialClasses.forEach(cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls))
      activeClasses.forEach(cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls))
      endClasses.forEach(cls => element.classList.contains(cls) && cls !== hiddenClass && stashedClasses.push(cls))
    }


    // Add initial class before element start transition
    addClasses(element, initialClasses);

    // remove the overlapping classes
    removeClasses(element, stashedClasses)

    // Add active class before element start transition and maitain it during the entire transition.
    addClasses(element, activeClasses)
    await nextAnimationFrame();

    // remove the initial class on frame after the beginning of the transition
    removeClasses(element, initialClasses)

    // add the endClass on frame after the beginning of the transition
    addClasses(element, endClasses);

    // dynamically comput the duration of the transition from the style of the element
    await afterTransition(element);

    // remove both activeClasses and endClasses
    removeClasses(element, activeClasses)
    if (removeEndClasses) {
      removeClasses(element, endClasses)
    }

    // restore the overlaping classes
    addClasses(element, stashedClasses)
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

  function addClasses(element: Element, classes: string[]) {
    if (classes.length > 0) {
      element.classList.add(...classes);
    }
  }

  function removeClasses(element: Element, classes: string[]) {
    if (classes.length > 0) {
      element.classList.remove(...classes);
    }
  }

  initialState()
  Object.assign(controller, { enter, leave, toggleTransition })
  return [enter, leave, toggleTransition]
}

function getAttribute(name: string, options: TransitionOptions, dataset: DOMStringMap): string[] {
  const datasetName = `transition${name[0].toUpperCase()}${name.substr(1)}`
  const datasetAlpineName = (alpineNames as any)[name]
  const classes = (options as any)[name] || dataset[datasetName] || dataset[datasetAlpineName] || " "
  return isEmpty(classes) ? [] : classes.split(" ")
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

async function nextAnimationFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function isEmpty(str: string): boolean {
  return (str.length === 0 || !str.trim());
}
