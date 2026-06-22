# useCookie

Adds getters and setters to easily read cookies and provides a simple API to set and clear cookies.

Simply list at the top of your controller the list of cookie names you need (static cookieNames = [])

Accessors are then automatically defined by the mixin.
- Getter/Setter name is a camelized conversion of the cookie name with the optional `Cookie` suffix. `user_id`  becomes `userIdCookie`

**Options:**

| Option| Description | Default value |
|-----------------------|-------------|---------------------|
| `expires` | Expire date of a cookie in days. Can be overriden on the options object on a per cookie basis |30|
| `suffix` | prepend or not `Cookie` to the accessor's name. Default is true to remain consistent with `Value` and `Class` API |true|


**Example**
```js
useCookie(this, { expires: 30, suffix: true }) // Same as useCookie(this)
```

## Usage

**Composing**

```js
import { Controller } from '@hotwired/stimulus'
import { useCookie } from 'stimulus-use'

export default class extends Controller {
    static cookieNames = ['dessert', 'colorScheme']

    connect() {
        useCookie(this)
        // Or pass an object to change the expires value (default 30 days):
        // useCookie(this, { expires: 30, suffix: true })

        // Getters are initialized for the declared cookieNames.
        // For a cookie with name 'colorScheme' and value 'dark'
        this.colorSchemeCookie // dark

        // You can save new cookies with the [name]Cookie setter
        this.dessertCookie = "cake"

        // Passing an object allows you to override the default expires value
        this.dessertCookie = {
            value: "pancakes",
            expires: 12 // Days to expire
        }

        // Individual getters
        this.dessertCookie // cake
        this.foodCookie // pasta 
        this.breakfastCookie // pancakes 

        // To immediately expire a cookie:
        this.dessertCookie = null
        this.dessertCookie // undefined 
    }
}
