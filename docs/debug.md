# Debug

Some `stimulus-use` mixins and controller have built in logging capabilities to help. By default all debugging features are disabled. Debug can be enabled globally or just for one specific mixin.

## Global setting

```js
import { Application } from '@hotwired/stimulus'
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

// enable StimulusUse debug mode
application.stimulusUseDebug = true
```

Another solution is to use the ENV variable to have something more dynamic per environment

```js
application.stimulusUseDebug = process.env.NODE_ENV === 'development'
```

## Per mixin

Some mixin have a debug option. For those, debug can be turned on locally using the debug option.

Example:

```js
useMatchMedia(this, { debug: true })
```
