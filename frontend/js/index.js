//var AddressClass = require('../classes/classes')['Address']
/*var user = require('../classes/classes.js')
const User = user.User*/

import {User} from '../classes/classes.js'


//const User = require('../classes/classes') 


var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var birthdate = document.getElementById("birthdate").value
    var gender = document.querySelector('input[name="gender"]:checked').value
    var ratiointerest = document.querySelector('input[name="interest"]:checked').value
    var rangeAge = document.querySelector('input[name="ageRange"]:checked').value

    fetch("http://localhost:7071/api/PostAndGetUser", {
        
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            birthdate: birthdate,
            gender: gender,
            interest: ratiointerest,
            agerange: rangeAge
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
/*
var getButton = document.getElementById("getUser")

getButton.addEventListener('click', function(){
    
    var username1 = document.getElementById("username").value
    fetch(`http://localhost:7071/api/PostAndGetUser?username=${username1}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }

            response.json().then(function(data) {
            console.log(data)

                var userdata = new User (data[1].value, data[2].value, data[3].value, data[4].value, data[5].value,data[7].value)

                document.getElementById("datausername").innerHTML = userdata._username
                document.getElementById("datafirstname").innerHTML = userdata._firstname
                document.getElementById("datalastname").innerHTML = userdata._lastname
                document.getElementById("databirthdate").innerHTML = userdata._birthdate
                document.getElementById("datagender").innerHTML = userdata._gender

            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
})
*/
