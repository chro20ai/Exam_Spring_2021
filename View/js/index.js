

import {User} from '../classes/classes.js'

var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var birthdate = document.getElementById("birthdate").value
    var region = document.querySelector('input[name="region"]:checked').value
    var gender = document.querySelector('input[name="gender"]:checked').value
    var lookingfor = document.querySelector('input[name="lookingfor"]:checked').value
    var rangeAge = document.querySelector('input[name="ageRange"]:checked').value

    var user = new User(1, username, password, firstname, lastname, birthdate, gender, lookingfor, rangeAge, region)

    user.create()

    localStorage.setItem("region", region) 
}) 

