# Getting Started

## With a build system

npm
```bash
npm i stimulus-use
```

yarn
```bash
yarn add stimulus-use
```

## Preview builds

Every commit on `main` and every pull request from a maintainer is published to [pkg.pr.new](https://pkg.pr.new/~/stimulus-use/stimulus-use). You can install an unreleased build directly from a commit or PR:

npm
```bash
npm i https://pkg.pr.new/stimulus-use@{commit}
```

yarn
```bash
yarn add https://pkg.pr.new/stimulus-use@{commit}
```

Replace `{commit}` with a commit SHA (e.g. `209b96d`) or a pull request number (e.g. `606`). Browse the available preview builds at [pkg.pr.new/~/stimulus-use/stimulus-use](https://pkg.pr.new/~/stimulus-use/stimulus-use).

## Without a build system

### Rails with Import Maps

If you are using [Ruby on Rails](https://rubyonrails.org/) with [import maps](https://html.spec.whatwg.org/multipage/webappapis.html#import-maps) via [`importmap-rails`](https://github.com/rails/importmap-rails), you can add Stimulus Use to your `importmap.rb`:

```sh
bin/importmap pin stimulus-use
```

You can then import it in your Stimulus controllers:

```javascript
import { ApplicationController } from 'stimulus-use'
```

**Important note!** Because of the way `importmap-rails` works, this will update your pinned version of `@hotwired/stimulus` from `"stimulus.min.js"` to `"@hotwired--stimulus.js" # @3.2.2`. 

If you already had `@hotwired/stimulus` in your `importmap.rb` thanks to the [`stimulus-rails`](https://github.com/hotwired/stimulus-rails) gem,
you should revert this dependency to `"stimulus.min.js"`.

### UMD

Alternatively, you can load `StimulusUse` in a `<script>` tag and it will be globally available through the `window.StimulusUse` object.

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
