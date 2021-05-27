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

page.script(code)
```
id
- Used for binding
dummy
- Used to represent a view in a button/link
- Ex. `page.Button( page.Text("hello", {dummy:true}) )` <- creates the button with the text inside it
extra
- Used for any extra css selectors 
- Such as `hidden`, `style`, etc.
action
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
