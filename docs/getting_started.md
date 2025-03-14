## Getting Started

#### With a build system

npm
```bash
npm i stimulus-use
```

yarn
```bash
yarn add stimulus-use
```

#### #NoBuild

##### Rails with Import Maps

If you are using [Ruby on Rails](https://rubyonrails.org/)
with [import maps](https://html.spec.whatwg.org/multipage/webappapis.html#import-maps)
via [`importmap-rails`](https://github.com/rails/importmap-rails),
you can add StimulusUse to your `importmap.rb`:

```sh
bin/importmap pin stimulus-use
```

You can then import it in your Stimulus controllers:

```javascript
import { ApplicationController } from 'stimulus-use'
```

**Important note!** Because of the way `importmap-rails` works,
this will update your pinned version of `@hotwired/stimulus` from
`"stimulus.min.js"` to `"@hotwired--stimulus.js" # @3.2.2`. 
If you already had `@hotwired/stimulus` in your `importmap.rb`
thanks to the [`stimulus-rails`](https://github.com/hotwired/stimulus-rails) gem,
you should revert this dependency to `"stimulus.min.js"`.

<small>Thanks to [@searls](https://github.com/searls) for
[pointing out this issue](https://github.com/stimulus-use/stimulus-use/issues/529).</small>

##### UMD

If you prefer not to use a build system, you can load StimulusUse in a `<script>` tag and it will be globally available through the window.StimulusUse object.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://unpkg.com/stimulus/dist/stimulus.umd.js"></script>
  <script src="https://unpkg.com/stimulus-use/dist/index.umd.js"></script>
  <script>
    (() => {
      const application = Stimulus.Application.start()

      application.register("hello", class extends Stimulus.Controller {
        connect(){
          StimulusUse.appear(this)
        }

        appear(){
          ...
        }
      })
    })()
  </script>
</head>
<body>
  <div data-controller="hello">
    …
  </div>
</body>
</html>
```
