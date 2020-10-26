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

#### UMD

If you prefer not to use a build system, you can load StimulusUse in a <script> tag and it will be globally available through the window.StimulusUse object.

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
