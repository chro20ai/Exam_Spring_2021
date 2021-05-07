import { User as _User} from '../../Model/classes.js';
const User = _User
import {arrayMatch} from '../../Model/classes.js'
var matchid

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

//knap der redirector til update.html
var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "update.html";
})
//knap der redirector til date.html
var date = document.getElementById("date")
date.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "date.html"
})

//logout knap der sletter alt data fra localstorage 
var logOutButton = document.getElementById("logout")
logOutButton.addEventListener("click", function(e) {
    e.preventDefault()
    //Sletter alle værdier fra localstorage
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("region")
    localStorage.removeItem("lookingfor")
    localStorage.removeItem("interest")
    localStorage.removeItem("swipefirstname")
    localStorage.removeItem("agerange")
    localStorage.removeItem("swipeid")
    //Sender dig videre til login side. 
    window.location = "login.html"
})

//knap der deleter en bruger, ved at kalde deleteuser() metoden fra klassen 
var deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()
    //Laver instans af User
    var deleteuser = new User()
    //Kalder metoden delete
    deleteuser.deleteUser()

})

//show youe matches
var showMatches = document.getElementById("showmatches")
showMatches.addEventListener("click", function(e) {
    e.preventDefault()
    //Laver instans af User
    var user = new User(localStorage.getItem("loggedIn"))
    //Kalder metoden showMatches. 
    user.showMatches(); 
})


// function der deleter et valgt knap. 
function deleteMatch(){
    //Laver fetch med URL fra azure function. 
    fetch("http://localhost:7071/api/deleteMatch", {
        method: 'DELETE',
        //Stringifier body så den kan længes i azure function. 
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
      
    .catch(err => {
        console.log(err)
    })
    //Giver en alert når der er slettet en bruger. 
    alert("You have now succesfully deleted your match with the selected user.")
    //Refresher siden bag efter, så listen over matches bliver opdateret. 
    location.reload();
}



var select = document.getElementById("user");

//tilføjer en eventlistender der lytter til click, og selecter et match
    select.addEventListener("click", function(e) {
        e.preventDefault()

//selectdelete, vælger brugeres fra dropdown man gerne vil vælge. 
    var selectdelete = document.getElementById("select1");
    //Vælger hvem der skal slettes fra dropdown.
    var selected = selectdelete.options[selectdelete.selectedIndex].text;
    arrayMatch

//forloop, der looper igennem matcharray. 
//Når brugeren fra matcharray er lig den valgte bruger fra dropdown, så slettes brugeren, 
//ved at kalde deletemMtch metoden fra klassen
    var i
    for( i=0 ; i < arrayMatch.length ; i ++){
        
        if(arrayMatch[i] == selected){
            matchid = arrayMatch[i-1]
        }
    }
    //Sletter et match. 
    deleteMatch()

})

