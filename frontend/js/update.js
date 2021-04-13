
import {User} from '../classes/classes.js'


//const User = require('../classes/classes') 


var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var username = document.getElementById("updateusername").value
    var password = document.getElementById("updatepassword").value
    var firstname = document.getElementById("updatefirstname").value
    var lastname = document.getElementById("updatelastname").value
    var birthdate = document.getElementById("updatebirthdate").value
    var gender = document.getElementById("updategender").value


    fetch("http://localhost:7071/api/PostAndGetUser", {
        
        method: 'UPDATE',
        body: JSON.stringify({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            gender: gender
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
    })
    .catch(err => {
        console.log(err)
    })
})
