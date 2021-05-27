const page = require('./vltvre.js');
var pg = new page("site/index.html")

pg.Text("Please enter your name")
pg.Input({bindto: "username"})

pg.Break()

pg.Text("Please enter a password")
pg.Input({
    bindto: "password",
    type: "password"
})
pg.Button(
    pg.Text("show", {dummy: true}),
    {action: function(){
        toggle_pass()
    }}
)

pg.Text("",{
    id: "password_show",
    extra: `hidden="true"`
})

pg.Break({amount: 2})

pg.Button(
    pg.Text("enter", {dummy: true})
)

pg.script(function(){
    var username = new bindObj()
    var password = new bindObj(function(){id("password_show").innerHTML = password.value})

    function toggle_pass() {
        id("password_show").hidden = !(id("password_show").hidden)
        console.log("toggle")
    }
})
pg.compile()