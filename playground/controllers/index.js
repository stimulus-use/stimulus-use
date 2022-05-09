import { application } from '../application'
import { definitionForModuleAndIdentifier, identifierForContextKey } from '@hotwired/stimulus-webpack-helpers'

const controllers = import.meta.glob('./**/*.js')

for (const path in controllers) {
  controllers[path]().then(controller => {
    const definition = definitionForModuleAndIdentifier(controller, identifierForContextKey(path))

    application.register(definition.identifier, definition.controllerConstructor)
  })
}

import { IntersectionController } from 'stimulus-use'
application.register('intersection', IntersectionController)
