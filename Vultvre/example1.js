const page = require('./vltvre.js');
var home = new page("site/index.html")

home.Text("inline values: {{bob.value}} oh yeah") //add this type of stuff

home.Input({
    bindto: "bob"
})


home.Text("change the input", {id: "text" })

home.script(function() {
    var bob = new bindObj(function(){document.getElementById('text').innerHTML = bob.value})
})

home.compile()
