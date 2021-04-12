/*var AddressClass = require('../classes/classes')['Address']
var UserClass = require('../classes/classes')['User']
var LikeClass = require('../classes/classes')['Like']
var MatchClass = require('../classes/classes')['Match']*/

var form = document.getElementById("form")


form.addEventListener("submit", function(e) {
    e.preventDefault()

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var birthdate = document.getElementById("birthdate").value
    var gender = document.getElementById("gender").value

    fetch("http://localhost:7071/api/PostAndGetUser", {
        method: 'POST',
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
        window.location = "homepage.html";
    })
    .catch(err => {
        console.log(err)
    })
})

var getButton = document.getElementById("getUser")

getButton.addEventListener('click', function(){
    var name1 = document.getElementById("name").value
    fetch(`http://localhost:7071/api/PostAndGetUser?name=${name1}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }


            response.json().then(function(data) {
            
                var datausername = data[1].value
                var datapassword = data[2].value
                var datafirstname = data[3].value
                var datalastname = data[4].value
                var databirthdate = data[5].value
                var datagender = data[6].value

                document.getElementById("datausername").innerHTML = datausername;
                document.getElementById("datapassword").innerHTML = datapassword;
                document.getElementById("datafirstname").innerHTML = datafirstname;
                document.getElementById("datalastname").innerHTML = datalastname;
                document.getElementById("databirthdate").innerHTML = databirthdate;
                document.getElementById("datagender").innerHTML = datagender;
                
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
})
