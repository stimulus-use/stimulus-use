import 'intersection-observer'
import { Application } from '@hotwired/stimulus'
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers'
import { IntersectionController } from 'stimulus-use'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))
application.register('intersection', IntersectionController)

// enable StimulusUse debug mode
application.stimulusUseDebug = process.env.NODE_ENV === 'development'

import './index.css'
