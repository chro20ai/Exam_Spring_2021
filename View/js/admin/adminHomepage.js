//import af User og Admin klasserne
import { User as _User, Admin as _Admin} from '../../classes/classes.js';
const User = _User
const Admin = _Admin

//Knap der redirector til update user HTML-page 
var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "adminUpdate.html";
})


//Knap der redirector til delete user HTML-page 
var deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "adminDelete.html";

})

//Få navn vist i h1 i toppen af admin.html
const h1 = document.querySelector('h1')
function showYourName() {
    if(localStorage.getItem('adminusername')){
        let username = localStorage.getItem("adminusername");
        h1.textContent = "Welcome to your admin profile, " + username + "!";
    }
}
//Dette betyder, at funktion køres når der tilgås siden. 
document.body.onload = showYourName




//Viser bruger-statestik 
var usercount = document.getElementById("usercount")
usercount.addEventListener("click", function(e) {
    e.preventDefault()

 var usercount = new Admin()


 usercount.userCount()
  
})

//Viser match-statestik 
var matchcount = document.getElementById("matchcount")
matchcount.addEventListener("click", function(e) {
    e.preventDefault()
    
    var matchcount = new Admin()

    matchcount.matchCount()
    
})


