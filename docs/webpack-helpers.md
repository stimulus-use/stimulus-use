## Webpack helpers

Those helpers where part of Stimulus v1.x and v2.x and where removed from 3.0 in favor of import maps and manuall registration. This is a copy of the original code that was used in Stimulus. the goal is to provide a simpler upgrade path to 3.x for application still relying on Webpack.

You can now just import `definitionsFromContext` from `stimulus-use` and use it as before

```js
// src/application.js
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus-use"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))
```
