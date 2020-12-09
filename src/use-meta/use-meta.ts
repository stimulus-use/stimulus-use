import { Controller } from 'stimulus'

const defineMetaGetter = (controller: Controller, metaName: string) => {
  Object.defineProperty(controller, metaName, {
    get(): any {
      return typeCast(metaValue(metaName))
    },
  })
}

function metaValue(name: string) {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element && element.getAttribute('content')
}

function typeCast(value: any): any {
  try {
    return JSON.parse(value)
  } catch (o_O) {
    return value
  }
}

export const useMeta = (controller: Controller) => {
  const metaNames = (controller.constructor as any).metaNames

  // defines the individual meta getters
  metaNames?.forEach((metaName: string) => {
    defineMetaGetter(controller, metaName)
  })

  // define the metas getter to retreive an object with all metas
  Object.defineProperty(controller, "metas", {
    get(): Record<string, any> {
      const result: Record<string, any> = {}

      metaNames?.forEach((metaName: string) => {
        const value = typeCast(metaValue(metaName))
        if (value !== undefined && value !== null) {
          result[metaName] = value
        }
      })
      return result
    },
  })
}
