# useMatchMedia

`useMatchMedia` tracks if the window matches the given media query strings.

It adds three new behaviors to your Stimulus controller for each media query string you specify:

- `is[Name]`  triggered when the media query string matches.
- `not[Name]` triggered when the media query string doesn't match.
- `[name]Changed` triggered when the media query changes.

## Reference

```javascript
useMatchMedia(controller, options)
```

**controller** : a Stimulus Controller (usually `'this'`)

**options** :

| Option| Description |&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Default value&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|
|-----------------------|-------------|---------------------|
| `mediaQueries` | An object of media queries where the key is the name of the query and the value is a media query string. **Make sure you wrap the whole query with parenthesis.** | all media query strings |
| `eventPrefix` | Whether to prefix the emitted event. Can be a **boolean** or a **string**.<br>- **true** prefix the event with the controller identifier `users:is:small` <br>- **my-prefix** prefix the event with the given string `my-prefix:is:small` <br>- **false** to remove prefix `is:small` | `true` |
| `debug` | Whether to log debug information. See [debug](debug.md) for more information on the debugging tools | `false` |
| `dispatchEvent` | Whether to dispatch a event. | `true` |

## Usage

```js
import { Controller } from 'stimulus'
import { useMatchMedia } from 'stimulus-use'

export default class extends Controller {
  connect() {
    useMatchMedia(this, {
      mediaQueries: {
        small: '(min-width: 320px) and (max-width: 769px)',
        tall: '(min-height: 1000px)',
        light: '(prefers-color-scheme: light)',
        landscape: '(orientation: landscape)',
      }
    })
  }

  smallChanged({ name, media, matches, event }) {
    console.log("small media query changed")
  }

  isSmall({ name, media, matches, event }) {
    console.log("small media query matches")
  }

  notSmall({ name, media, matches, event }) {
    console.log("small media query doesn't match")
  }

  // The same for
  // tall      => tallChanged()      // isTall()      // notTall
  // light     => lightChanged()     // isLight()     // notLight()
  // landscape => landscapeChanged() // isLandscape() // notLandscape()
}
```
