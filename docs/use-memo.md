# useMemo

Adds one new behavior to your Stimulus controller : `memo`

This behavior can be used to cache ("memoize") expensive getter methods, for example when parsing attributes passed in via the Stimulus Data API. All you need to do is to add a static array of getter method names `memos`, as you would define your `targets`. Then call `useMemo(this)` in your `connect()` callback and your getters are memoized.

## Reference

```javascript
useMemo(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from 'stimulus'
import { useMemo } from 'stimulus-use'

export default class extends Controller {
  static memos = ['normalizedText']
  static targets = ['longText']

  connect() {
    useMemo(this)

    this.normalizedText // first call normalize the text and cache the result
    this.normalizedText // second call gets the result from the cache
  }

  get normalizedText() {
    return this.longTextTarget.textContent.normalize('NFD')
  }
}
```
