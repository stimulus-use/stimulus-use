# Debug

Some `stimulus-use` mixins and controller have built in logging capabilities to help. By default all debugging features are disabled. Debug can be enabled globally or just for one specific mixin.

## Global setting

`stimulus-use` follows Stimulus' own [debug mode](https://stimulus.hotwired.dev/handbook/installing#debugging). Enable it on your application and `stimulus-use` will log too:

```js
import { Application } from '@hotwired/stimulus'
import { definitionsFromContext } from '@hotwired/stimulus-webpack-helpers'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

// enable debug mode (Stimulus + stimulus-use)
application.debug = true
```

Another solution is to use the ENV variable to have something more dynamic per environment

```js
application.debug = process.env.NODE_ENV === 'development'
```

::: warning `application.stimulusUseDebug` is deprecated
Earlier versions used a separate `application.stimulusUseDebug` flag. It still works as a fallback but is deprecated and will be removed in a future release, setting it logs a deprecation warning. Use Stimulus' built-in `application.debug` instead.
:::

## Per mixin

Some mixin have a debug option. For those, debug can be turned on locally using the debug option.

Example:

```js
useMatchMedia(this, { debug: true })
```
