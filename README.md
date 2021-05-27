# vultvre
 An improvement of Appmaker that allows for practical creation of webapps

### Why use Vltvre
- For simple, yet practical, webapps
  - but It has no styling (bc I think CSS is just absolutely horrible). You can manually style however
- Browser based, so it is cross-platform
  - HTML integration supported

### The basics

To include, use `require('./vltvre.js');`
- so for example, `const page = require('./vltvre.js');`
Creating a new page is as easy as `var name = new page("source")
- ex. `var pg = new page("site/index.html")`
- If you have a sub directory (as seen above) make sure to **create** that directory before running. Creating the files themselves is not necessary
For adding elements, choose your page and execute one of the following methods
```
page.Text("contents", {id?, dummy?, extra?})

page.Input({bindto?, type?, dummy?, extra?})

page.Button(view, {action?, dummy?})

page.Break({amount?})
```
## id
- Used for binding
## dummy
- Used to represent a view in a button/link
- Ex. `page.Button( page.Text("hello", {dummy:true}) )` <- creates the button with the text inside it
## extra
- Used for any extra css selectors 
- Such as `hidden`, `style`, etc.
## action
- The action for a button
- Must be represented as an anonymous function (`function(){code}`)
  - Ex. 
  ```
  page.Button(
  page.Text("hello", {dummy:true}, //view
  {action: function(){ //anon. function
    console.log("whats up")
    }
  ) 
  ```
---
## Scripting
- This adds custom scripts to your html page!
- It can be done with `page.script(code)`
 - `code` must be an anonymous function
 - Ex. `page.script(function(){console.log('epic custom scripts')})`
## Binding
- Bindings must be done with a class called `bindObj` (already included)
- creating bindable variables are done like this: `var name = new bindObj(action?)`
  - `action` is optional, and supports two-way bindings
    - It will run the following function whenever the variable's value is changed
 - `action` must also be a anon. function
 - To change a bindable var's value, use `var.value`
   - This supports get and set
     - so `var.value = "10"` and `console.log(var.value)` work
---
- To bind an input element (not an output such as text) to a variable, use the `bindto` parameter
- It must be the variables name as a string 
  - `page.Input({bindto: "myvar"})`
---
- To bind a variable to an output element, use the `action` property of the bindObj
- This can be done on assingment
  - `var myvar = new bindObj(function(){console.log("myvar has been edited")})`
  - Or by just editing it's property
