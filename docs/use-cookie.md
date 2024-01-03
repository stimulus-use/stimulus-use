# useCookie

Adds getters to easily read cookies and provides a simple API to set and clear cookies.

Getters are then automatically defined by the mixin.
- Getter name is a camelized conversion of the cookie name with the `Cookie` suffix. `user_id`  becomes `userIdCookie`

**Options:**

| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `expires` | Expire date of a cookie in days. Can be overriden on the options object on a per cookie basis |30|


**Example**
```js
useCookie(this, { expires: 30 }) // Same as useCookie(this)
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useCookie } from 'stimulus-use'

export default class extends Controller {

  connect() {
    useCookie(this)
    // Or pass an object to change the expires value (default 30 days):
    // useCookie(this, { expires: 30 })

    // Getters are initialized for all current cookies.
    // For a cookie with name 'colorScheme' and value 'dark'
    this.colorSchemeCookie // dark

    // You can save new cookies with setCookie
    // By passing two strings as name-value
    this.setCookie("dessert", "cake")

    // Or with an object:
    this.setCookie({ name: "food", value: "pasta"})

    // Passing an object allows you to override the default expires value
    this.setCookie(
      { name: "breakfast", 
        value: "pancakes",
        expires: 12 // Days to expire
      })

    // Individual getters
    this.dessertCookie // cake
    this.foodCookie // pasta 
    this.breakfastCookie // pancakes 

    // It's also possible to use setCookie to update a cookie:
    this.setCookie("dessert", "tiramisu")
    this.dessertCookie // 'tiramisu' 

    // You can expire a cookie to remove it:
    this.clearCookie("dessert")
    this.dessertCookie // undefined 

  }
}
```


## Avoiding name-collision 
Cookie names, case-sensitive, permit any character except " , ; \" 
However, bear in mind that cookie names are camelized, and using underscores or hyphens might cause collisions in certain cases. For example:

```
    this.setCookie("my-home", "123")
    this.setCookie("my_home", "456")
    this.setCookie("myHome", "456")
```

Even though these are valid cookie names, they will share the same getter name as ```this.myHomeCookie```. 
