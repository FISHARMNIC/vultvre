var fs = require('fs');

module.exports = class page {
    constructor(directory){
        this.directory = directory

        this.elements = []
        this.scripts = []

        this.idcounter = 0
        this.forceid = 0
    }

    Text(value,{dummy = false, id = undefined, extra = undefined} = {}) {
        // var regExp =/{{([^}]+)}}/g;
        // var result = value.match(regExp);
        // if (result != null) {
        //     for (var p = 0; p < result.length; p++){
        //         console.log(result[p].slice(2,-2));
        //     }
        // }

        var ret = "<div"
        if (id != undefined) {
            ret += ` id="${id}"`
            this.idcounter += 1
        }

        if (extra != undefined){
            ret += " " + extra + " "
        }

        ret += ">"

        var build = ""
        var p = 0
        while (p < value.length){
            build += value[p]
            if(value[p] == "{" && value[p+1] == "{"){
                ret += `<span>${build.slice(0,-1)}</span>`
                console.log(build)
                build = ""
                p+=2
                while (value[p] != "}" && value[p+1] != "}"){
                    build += value[p]
                    p += 1
                }
                build+= value[p]
                ret += `<span id="${this.idcounter}"></span>`
                this.scripts.push(`
                function force${this.forceid}() {
                    document.getElementById("${this.idcounter}").innerHTML = ${build}
                }
                `)
                this.idcounter += 1
                this.forceid += 1
                
                console.log(build)
                build = ""
                p+=2
            }
            p += 1
        }
        ret += `<span>${build}</span></div>`
        console.log(ret)
        
        if (dummy) return ret
        this.elements.push(ret)
    }

    Input({bindto = undefined, dummy = false, type = undefined, extra = undefined} = {}) {
        var ret = `<input id="${this.idcounter}"`
        if (bindto != undefined) {
            ret += ` onkeyup="update${this.idcounter}()"`
            this.scripts.push(`
            function update${this.idcounter}() {
                ${bindto}.value = document.getElementById("${this.idcounter}").value
            }
            `)
            this.idcounter += 1
        }
        if (type != undefined) {
            ret += ` type="${type}"`
            this.scripts.push(`
            `)
        }

        if (extra != undefined){
            ret += " " + extra + " "
        }
        ret += ">"
        if (dummy) return ret
        this.elements.push(ret)
    }

    Button(view,{action = undefined, dummy = false} = {}) {
        var ret= "<button"
        if (action != undefined) {
            ret += ` onclick="${action.toString().substring(12).slice(0, -1)}"`
        }
        ret += `>${view}</button>`

        if (dummy) return ret
        this.elements.push(ret)

    }

    Break({amount = 1} = {}) {
        this.elements.push("<br>".repeat(amount))
    }

    script(code){
        this.scripts.push(code.toString().substring(12).slice(0, -1))
    }



    compile(){
        fs.writeFileSync(`${this.directory}`, `
        ${this.elements.join(' ')}
        <script>
        class bindObj {
            constructor(action = function(){console.log('none')}) {
                this.action = action
                this.varval
            }
            get value() {
                return this.varval
            }
            set value(val) {
                this.varval = val
                this.action()
                forceall()
            }
        }
        function forceall(){
            for (i = 0; i < ${this.forceid}; i++) {
                eval(\`force\${i}()\`)
            }
        }

        function id(mid) {
            return document.getElementById(mid)
        }
        ${this.scripts.join(' ')}
        </script>
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
    }
}