import 'intersection-observer'
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

// enable StimulusUse debug mode
application.stimulusUseDebug = process.env.NODE_ENV === 'development'

import './index.css'
