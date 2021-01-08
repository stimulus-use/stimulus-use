import 'intersection-observer'
import { Application } from 'stimulus'
import { IntersectionController } from 'stimulus-use'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))
application.register('intersection', IntersectionController)

import './index.css'
