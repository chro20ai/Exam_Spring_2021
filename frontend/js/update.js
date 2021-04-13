
//import {User} from '../classes/classes.js'


//const User = require('../classes/classes') 


var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var updateusername = document.getElementById("updateusername").value
    var updatepassword = document.getElementById("updatepassword").value
    var updatefirstname = document.getElementById("updatefirstname").value
    var updatelastname = document.getElementById("updatelastname").value
    var updatebirthdate = document.getElementById("updatebirthdate").value
    var updategender = document.getElementById("updategender").value

    var id = localStorage.getItem("loggedIn")
    fetch("http://localhost:7071/api/Update", {
        
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            username: updateusername,
            password: updatepassword,
            firstname: updatefirstname,
            lastname: updatelastname,
            birthdate: updatebirthdate,
            gender: updategender
            
        }),
        
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        window.location = "homepage.html";

    })
    .catch(err => {
        console.log(err)
    })
})
