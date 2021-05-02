import { User as _User} from '../classes/classes.js';
const User = _User

//Få navn vist i h1 i toppen af profile.html
const h1 = document.querySelector('h1')
function showYourName() {
    if(localStorage.getItem('username')){
        let username = localStorage.getItem("username");
        h1.textContent = "Welcome to your profile, " + username + "!";
    }
}
//Dette betyder, at funktion køres når der tilgås siden. 
document.body.onload = showYourName


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
    localStorage.removeItem("interest")
    localStorage.removeItem("swipefirstname")
    localStorage.removeItem("agerange")
    localStorage.removeItem("swipeid")
    window.location = "login.html"
})




//delete User  //mangler --> virker ikke 
var deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()
    
    var deleteuser = new User(localStorage.getItem("loggedIn"))
    
    deleteuser.deleteUser()
    
})



//show youe matches
var showMatches = document.getElementById("showmatches")
showMatches.addEventListener("click", function(e) {
    e.preventDefault()
    
    var user = new User(localStorage.getItem("loggedIn"))

    user.showMatches(); 

})

/*function deleteLikes(){
    fetch("http://localhost:7071/api/deleteLikes", {
        method: 'DELETE',
        body: JSON.stringify({
            user_id: 107,
            target_user_id: 105
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    
    .then((response) => {
        return response.json()

    })
    .then((data) => {        
       
    })     
    .catch(err => {
        console.log(err)
    }) 
}
*/


var select = document.getElementById("user");

    select.addEventListener("click", function(e) {
        e.preventDefault()   


    var deletematch = new User()
    deletematch.deleteMatch()

})

