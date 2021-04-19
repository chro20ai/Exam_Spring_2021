//Få navn vist i h1 i toppen af profile.html
const h1 = document.querySelector('h1')
function showYourName() {
    if(localStorage.getItem('username')){
        let username = localStorage.getItem("username");
        h1.textContent = "Velkommen til din profil, " + username + "!";
    }
}
//Dette betyder, at funktion køres når der tilgås siden. 
document.body.onload = showYourName


var deleteButton = document.getElementById("delete")
var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "update.html";
})

var date = document.getElementById("date")
date.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "date.html"
})

var logOutButton = document.getElementById("logout")
logOutButton.addEventListener("click", function(e) {
    e.preventDefault()
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("region")
    localStorage.removeItem("lookingfor")
    window.location = "login.html"
})

deleteButton.addEventListener("click", function(e) {
    e.preventDefault()

    var id = localStorage.getItem("loggedIn")
        fetch("http://localhost:7071/api/deleteProfile", {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {        
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("username")
        window.location = "login.html";
    })     
    .catch(err => {
        console.log(err)
    })
})

   
            
 
