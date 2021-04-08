var AddressClass = require('../classes/classes')['Address']
var UserClass = require('../classes/classes')['User']
var LikeClass = require('../classes/classes')['Like']
var MatchClass = require('../classes/classes')['Match']


var form = document.getElementById("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var birthdate = document.getElementById("birthdate").value
    var fabrikId = document.getElementById("fabrik_id").value

    fetch("http://localhost:7071/api/PostAndGetUser", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            gender: gender,
            birthdate: birthdate,
            fabrikId: fabrikId
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
                var dataname = data[1].value
                var dataemail = data[2].value
                var datagender = data[3].value
                var databirthdate = data[4].value
                var datafabrikId = data[5].value

                document.getElementById("dataname").innerHTML = dataname;
                document.getElementById("dataemail").innerHTML = dataemail;
                document.getElementById("datagender").innerHTML = datagender;
                document.getElementById("databirthdate").innerHTML = databirthdate;
                document.getElementById("datafabrikId").innerHTML = datafabrikId;
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
})