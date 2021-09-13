import { Definition } from "@hotwired/stimulus"

export interface ECMAScriptModule {
  __esModule: boolean
  default?: object
}

export function definitionsFromContext(context: any): Definition[] {
  return context.keys()
    .map((key: any) => definitionForModuleWithContextAndKey(context, key))
    .filter((value: any) => value) as Definition[]
}

function definitionForModuleWithContextAndKey(context: any, key: string): Definition | undefined {
  const identifier = identifierForContextKey(key)
  if (identifier) {
    return definitionForModuleAndIdentifier(context(key), identifier)
  }
}

function definitionForModuleAndIdentifier(module: ECMAScriptModule, identifier: string): Definition | undefined {
  const controllerConstructor = module.default as any
  if (typeof controllerConstructor == "function") {
    return { identifier, controllerConstructor }
  }
}

export function identifierForContextKey(key: string): string | undefined {
  const logicalName = (key.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) || [])[1]
  if (logicalName) {
    return logicalName.replace(/_/g, "-").replace(/\//g, "--")
  }
}
