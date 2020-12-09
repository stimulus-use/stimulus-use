# useMeta

Adds getters to easily retrieve <head> meta value.

Simply list at the top of your controller the list of meta name you need (static metaNames = [])

Getters are then automatically defined by the mixin.
- Getter name is a camelized converstion of the meta name. `user_id`  becomes `userId`
- Values are automaticaly cast so getters return : String, Number, Boolean or Object

## Usage

**Composing**

Given some <head> html

```html
<head>
  ...
  <meta name="userId" content="12345678">
  <meta name="admin" content="true">
  <meta name="email" content="joe@doe.com">
  <meta name="snake_case_name" content="are camelized">
  ...
</head>
```

```js
import { Controller } from 'stimulus'
import { useMeta } from 'stimulus-use'

export default class extends Controller {
  static metaNames = ['userId', 'admin', 'email', 'snake_case_name']

  connect() {
    useMeta(this)

    // individual getters
    this.userId         // 123456
    this.admin          // true
    this.email          // "joe@doe.com"
    this.snakeCaseName  // "are camelized"

    // get all metas in one object
    this.metas
    // {
    //   userId: 123456,
    //   admin: true,
    //   email: "joe@doe.com",
    //   snakeCaseName: "are camelized"
    // }
  }
}
```


