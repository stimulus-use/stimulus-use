# useMemo

Adds one new behavior to your Stimulus controller : `memo`

This behavior can be used to cache ("memoize") expensive getter methods, for example when parsing attributes passed in via the Stimulus Data API. All you need to do is to add a static array of getter method names `memos`, as you would define your `targets`. Then call `useMemo(this)` in your `connect()` callback and your getters are memoized.

Memoization is **lazy**: calling `useMemo(this)` does not run your getters. Each getter runs the first time you access it, and its result is cached for every subsequent access.

::: tip Only getters are memoized
`useMemo` works with `get` accessors only. Plain methods listed in `memos` are left untouched (they are not memoized), since memoizing a method that may take arguments isn't well defined. If you want to cache the result of a method, expose it as a getter instead.
:::

## Reference

```javascript
useMemo(controller)
```

**controller** : a Stimulus Controller (usually `'this'`)

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
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
