
import {User} from '../classes/classes.js'


//const User = require('../classes/classes') 


var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var updateusername = document.getElementById("updateusername").value
    var updatepassword = document.getElementById("updatepassword").value
    var updatefirstname = document.getElementById("updatefirstname").value
    var updatelastname = document.getElementById("updatelastname").value
    var updatebirthdate = document.getElementById("updatebirthdate").value
    var updategender = document.querySelector('input[name="gender"]:checked').value
    var ratiointerest = document.querySelector('input[name="interest"]:checked').value

    var id = localStorage.getItem("loggedIn")

    var user = new User(id, updateusername, updatepassword, updatefirstname, updatelastname, updatebirthdate, updategender, ratiointerest)

    user.update()
})
