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
  prefixedTargets: string[]
  options: TargetMutationOptions
  targetSelector: string
  scopedTargetSelector: string

  constructor(controller: TargetMutationController, options: TargetMutationOptions = {}) {
    super(controller, options)

    this.controller = controller
    this.options = options
    this.targetElement = controller.element
    this.identifier = controller.scope.identifier
    this.identifierPrefix = `${this.identifier}.`
    this.targetSelector = controller.scope.schema.targetAttribute
    this.scopedTargetSelector = `data-${this.identifier}-target` //TODO: If/When stimulus 2.0 adds the identifier scoped targetAttribute to the schema, use that here instead
    // @ts-ignore
    this.targets = options.targets || controller.constructor.targets
    this.prefixedTargets = this.targets.map((target) => `${this.identifierPrefix}${target}`)
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
        attributeFilter: [this.targetSelector, this.scopedTargetSelector]
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
          if (mutation.attributeName === this.targetSelector || mutation.attributeName === this.scopedTargetSelector) {
            // Filter out any targets that don't belong to this controller
            let oldTargets = this.targetsUsedByThisController(oldValue)
            let newTargets = this.targetsUsedByThisController(newValue)
            let removedTargets = oldTargets.filter(target => !newTargets.includes(target)) // Get only the oldTargets that dont occur in newTargets, thus, removed
            let addedTargets = newTargets.filter(target => !oldTargets.includes(target)) // Get only the newTargets that dont occur in oldTargets - thus, added
            // Fire updates for each changed target on the controller
            removedTargets.forEach(target => this.targetRemoved(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'))
            addedTargets.forEach(target => this.targetAdded(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'))
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
    // Extracts from the node, the target string, targetsUsedByThisController filters it, returns the array of supported target names
    let nodeElement = node as Element
    return this.targetsUsedByThisController(nodeElement.getAttribute(this.scopedTargetSelector) || nodeElement.getAttribute(this.targetSelector))
  }

  private targetsUsedByThisController(targetStr: string | null) {
    // Filters out any targets that don't belong to this  controller and returns the array of supported target names
    targetStr = targetStr || ''
    let targetsToCheck = this.stripIdentifierPrefix(targetStr).split(' ')
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
