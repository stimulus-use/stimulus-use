import { Controller } from 'stimulus'
import { camelize } from '../support/index'

export interface MetaOptions {
  suffix: boolean
}

const defineMetaGetter = (controller: Controller, metaName: string, suffix: boolean) => {
  const getterName = suffix ? `${camelize(metaName)}Meta` : camelize(metaName)

  Object.defineProperty(controller, getterName, {
    get(): any {
      return typeCast(metaValue(metaName))
    }
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

export const useMeta = (controller: Controller, options: MetaOptions = { suffix: true }) => {
  const metaNames = (controller.constructor as any).metaNames
  const suffix = options.suffix

  // defines the individual meta getters
  metaNames?.forEach((metaName: string) => {
    defineMetaGetter(controller, metaName, suffix)
  })

  // define the metas getter to retreive an object with all metas
  Object.defineProperty(controller, 'metas', {
    get(): Record<string, any> {
      const result: Record<string, any> = {}

      metaNames?.forEach((metaName: string) => {
        const value = typeCast(metaValue(metaName))
        if (value !== undefined && value !== null) {
          result[camelize(metaName)] = value
        }
      })
      return result
    }
  })
}
