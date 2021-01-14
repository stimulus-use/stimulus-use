import { StimulusUse, StimulusUseOptions } from '../stimulus_use'
import { method } from '../support/index'
import { TargetMutationController } from './target-mutation-controller'

export interface TargetMutationOptions extends StimulusUseOptions {
  targets?: string[]
}

export class UseTargetMutation extends StimulusUse {
  controller: TargetMutationController
  observer: MutationObserver
  targetElement: Node
  identifier: string
  identifierPrefix: string
  targets: string[]
  options: TargetMutationOptions
  targetSelector: string

  constructor(controller: TargetMutationController, options: TargetMutationOptions = {}) {
    super(controller, options)

    this.controller = controller
    this.options = options
    this.targetElement = controller.element
    this.identifier = controller.scope.identifier
    this.identifierPrefix = `${this.identifier}.`
    this.targetSelector = controller.scope.schema.targetAttribute
    // @ts-ignore
    this.targets = options.targets || controller.constructor.targets as string[]
    // If the user is using the old Stimulus target format
    if (this.targetSelector == `data-target`) {
      this.targets = this.targets.map((target) => `${this.identifierPrefix}${target}`)
    }
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
        attributeFilter: [this.targetSelector]
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
          if (mutation.attributeName === this.targetSelector) {
            // Filter out any targets that don't belong to this controller
            let oldTargets = this.targetsUsedByThisController(oldValue)
            let newTargets = this.targetsUsedByThisController(newValue)
            let changedOldTargets = oldTargets.filter(target => !newTargets.includes(target)) // Get only the oldTargets that dont occur in newTargets
            let changedNewTargets = newTargets.filter(target => !oldTargets.includes(target)) // Get only the newTargets that dont occur in oldTargets
            // Fire updates for each changed target on the controller
            changedOldTargets.forEach(target => this.targetRemoved(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'))
            changedNewTargets.forEach(target => this.targetAdded(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'))
          }

          break
        case 'childList':
          let { addedNodes, removedNodes } = mutation
          addedNodes.forEach((node: Node) => {
            let supportedTargets = this.targetsUsedByThisControllerFromNode(node)
            supportedTargets.forEach((target) => {
              this.targetAdded(this.stripIdentifierPrefix(target), mutation.target, 'domMutation')
            })
          })
          removedNodes.forEach((node: Node) => {
            let supportedTargets = this.targetsUsedByThisControllerFromNode(node)
            supportedTargets.forEach((target) => {
              this.targetRemoved(this.stripIdentifierPrefix(target), mutation.target, 'domMutation')
            })
          })
          break
      }
    }
  }

  private targetAdded(name: string, node: Node, trigger: string) {
    let targetCallback = `${name}TargetAdded`
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node)
    this.log('targetAdded', { target: name, node, trigger })
  }

  private targetRemoved(name: string, node: Node, trigger: string) {
    let targetCallback = `${name}TargetRemoved`
    this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node)
    this.log('targetRemoved', { target: name, node, trigger })
  }

  private targetsUsedByThisControllerFromNode(node: Node) {
    let nodeElement = node as Element
    if (!nodeElement.hasAttribute(this.targetSelector)) {
      return []
    }
    return this.targetsUsedByThisController(nodeElement.getAttribute(this.targetSelector)!)// Filter out any targets that don't belong to this controller
  }

  private targetsUsedByThisController(targetStr: string | null): string[] {
    targetStr = targetStr || ''
    let targetsToCheck = targetStr.split(' ')
    return this.targets.filter((n) => targetsToCheck.indexOf(n) !== -1)
  }

  private stripIdentifierPrefix(target: string): string {
    return target.replace(new RegExp(this.identifierPrefix, 'g'), '')
  }

  private enhanceController() {
    const controllerDisconnect = this.controller.disconnect.bind(this.controller)
    const disconnect = () => {
      this.unobserve()
      controllerDisconnect()
    }
    Object.assign(this.controller, { disconnect })
  }
}

export const useTargetMutation = (controller: TargetMutationController, options: TargetMutationOptions = {}) => {
  const observer = new UseTargetMutation(controller, options)
  return [observer.observe, observer.unobserve]
}
