import { User as _User} from '../classes/classes.js';
import { arrayMatch} from '../classes/classes.js';
const User = _User
var matchid


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

//delete User
var deleteButton = document.getElementById("delete")
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



var showMatches = document.getElementById("showmatches")
showMatches.addEventListener("click", function(e) {
    e.preventDefault()
    
    var user = new User(localStorage.getItem("loggedIn"))

    document.getElementById("myTableData").style.visibility = "visible";
    document.getElementById("delete").style.visibility = "visible";
    document.getElementById("matchusername").style.visibility = "visible";
    document.getElementById("matchfirstname").style.visibility = "visible";
    document.getElementById("matchlastname").style.visibility = "visible";
    document.getElementById("matchage").style.visibility = "visible";
    document.getElementById("matchgender").style.visibility = "visible";
    document.getElementById("matchregion").style.visibility = "visible";
    
    

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

function deleteMatch(){
    fetch("http://localhost:7071/api/deleteMatch", {
        method: 'DELETE',
        body: JSON.stringify({
            id: matchid
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

var select = document.getElementById("user");

    select.addEventListener("click", function(e) {
        e.preventDefault()
    
    var selectdelete = document.getElementById("select1");
    var selected = selectdelete.options[selectdelete.selectedIndex].text;
    arrayMatch
    
    var i
    for( i=0 ; i < arrayMatch.length ; i ++){
        if(arrayMatch[i] == selected){
            matchid = arrayMatch[i-1]
        }
    }

    
    deleteMatch()

    //deleteLikes()

})

