import { StimulusUse, StimulusUseOptions } from '../stimulus_use'
import { method } from '../support/index'
import { TargetChangesController } from './target-changes-controller'

export interface TargetChangesOptions extends StimulusUseOptions {

}

export class UseTargetChanges extends StimulusUse {
  controller: TargetChangesController
  observer: MutationObserver
  targetElement: Node
  targets: string[]
  deprecatedTargets: string[]
  options: TargetChangesOptions
  targetSelector: string
  deprecatedTargetSelector: string

  constructor(controller: TargetChangesController, targets: string[], options: TargetChangesOptions = {}) {
    super(controller, options)

    this.targetElement = controller.element
    this.targets = targets
    this.deprecatedTargets = this.targets.map(target => `${controller.identifier}.${target}`)
    this.controller = controller
    this.deprecatedTargetSelector = `data-target`
    this.targetSelector = `data-${this.controller.identifier}-target`
    this.options = options
    this.observer = new MutationObserver(this.mutation)

    this.enhanceController()
    this.observe()
  }

  observe = () => {
    this.observer.observe(
      this.targetElement,
      {
        subtree: true,
        childList: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: [
          this.targetSelector,
          this.deprecatedTargetSelector
        ]
      }
    )
  }

  unobserve = () => {
    this.observer.disconnect()
  }

  mutation = (entries: MutationRecord[]) => {
    for (const mutation of entries) {
      switch (mutation.type) {
        case 'attributes':
          let newValue = (mutation.target as Element).getAttribute(mutation.attributeName as string)
          let oldValue = mutation.oldValue

          // If this was an attribute change, and the attribute change resulted in a target changing
          if (mutation.attributeName === this.targetSelector || mutation.attributeName === this.deprecatedTargetSelector) {
            // Filter out any targets that don't belong to this controller
            let oldTargets = this.targetsUsedByThisController(oldValue)
            let newTargets = this.targetsUsedByThisController(newValue)
            let changedOldTargets = oldTargets.filter(target => !newTargets.includes(target)) // Get only the oldTargets that dont occur in newTargets
            let changedNewTargets = newTargets.filter(target => !oldTargets.includes(target)) // Get only the newTargets that dont occur in oldTargets
            // Fire updates for each changed target on the controller
            changedOldTargets.forEach(target => {
              this.targetRemoved(this.stripIdentifier(target), mutation.target, 'attributeChange')
            })
            changedNewTargets.forEach(target => {
              this.targetAdded(this.stripIdentifier(target), mutation.target, 'attributeChange')
            })
          }

          break
        case 'childList':
          let { addedNodes, removedNodes } = mutation
          addedNodes.forEach((node: Node) => {
            let nodeElement = (node as Element)
            let target
            // Detect which stimulus target syntax  the user is using then use the corresponding attribute name to get the values
            if (nodeElement.hasAttribute(this.targetSelector)) {
              target = nodeElement.getAttribute(this.targetSelector)
            } else if (nodeElement.hasAttribute(this.deprecatedTargetSelector)) {
              target = nodeElement.getAttribute(this.deprecatedTargetSelector)
            } else {
              return
            }
            let supportedTargets = this.targetsUsedByThisController(target!) // Filter out any targets that don't belong to this controller
            supportedTargets.forEach(target => this.targetAdded(this.stripIdentifier(target), mutation.target, 'domMutation')) // Fire updates for each changed target on the controller
          })
          removedNodes.forEach((node: Node) => {
            let nodeElement = node as Element
            let target
            // Detect which stimulus target syntax  the user is using then use the corresponding attribute name to get the values
            if (nodeElement.hasAttribute(this.targetSelector)) {
              target = nodeElement.getAttribute(this.targetSelector)
            } else if (nodeElement.hasAttribute(this.deprecatedTargetSelector)) {
              target = nodeElement.getAttribute(this.deprecatedTargetSelector)
            } else {
              return
            }
            let supportedTargets = this.targetsUsedByThisController(target!)// Filter out any targets that don't belong to this controller
            supportedTargets.forEach(target => this.targetRemoved(this.stripIdentifier(target), mutation.target, 'domMutation'))// Fire updates for each changed target on the controller
          })

          break
      }
    }
  }

  targetAdded(name: string, node: Node, trigger: string) {
    let targetCallback = `${name}TargetAdded`
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node)
    this.log('targetAdded', { target: name, node, trigger })
  }

  targetRemoved(name: string, node: Node, trigger: string) {
    let targetCallback = `${name}TargetRemoved`
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node)
    this.log('targetRemoved', { target: name, node, trigger })
  }

  targetsUsedByThisController(targetStr: string | null): string[] {
    targetStr = targetStr || ''
    let identifier = this.controller.identifier + '.'

    let otherTargets = targetStr.split(' ')
    if (targetStr.includes(identifier)) {
      // If the user is using the old stimulus target syntax of data-target="controller.foo"
      return this.deprecatedTargets.filter((n) => otherTargets.indexOf(n) !== -1)
    } else {
      // If the user is using the new stimulus target syntax of data-controller-target="foo"
      return this.targets.filter((n) => otherTargets.indexOf(n) !== -1)
    }
  }

  stripIdentifier(target: string): string {
    return target.replace(new RegExp(`${this.controller.identifier}.`, 'g'), '')
  }

  enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller)
    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }
    Object.assign(this.controller, { disconnect })
  }
}

export const useTargetChanges = (controller: TargetChangesController, targets: string[], options: TargetChangesOptions = {}) => {
  const observer = new UseTargetChanges(controller, targets, options)
  return [observer.observe, observer.unobserve]
}
