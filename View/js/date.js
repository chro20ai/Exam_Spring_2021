import { User as _User} from '../classes/classes.js';
import { Node as _Node, Graph as _Graph } from '../classes/algoritmen.js';
import { Votes as _Votes, Match as _Match } from '../classes/classes.js';
const User = _User
const Graph = _Graph
const Votes = _Votes
const Match = _Match

//hent og sorter brugere
window.onload = function(){
var node = new Graph()
node.algoritme()
}
    


//swipe brugere  
swipe.addEventListener("click", function(e) {
    e.preventDefault()
swipefunction()

})

//swipe metode 

function swipefunction(){
var username;
var firstname;
var lastname;
var age;
var gender;
var regionshow;
var interest;


console.log(array)

var swipeuser = new User ()

try {
    if(array[swipeindex][1][0].value == id){
            swipeindex++;
            }
            localStorage.setItem("swipeid", array[swipeindex][1][0].value)
            localStorage.setItem("swipefirstname", array[swipeindex][1][3].value)
            username = array[swipeindex][1][1].value
            firstname = array[swipeindex][1][3].value
            lastname = array[swipeindex][1][4].value
            age = swipeuser.getAge(array[swipeindex][1][5].value)
            gender = array[swipeindex][1][6].value   
            regionshow =  array[swipeindex][1][9].value  
            if(array[swipeindex][1][11].value == 1){interest = "Sport"}
            if(array[swipeindex][1][11].value == 2){interest = "Art"}
            if(array[swipeindex][1][11].value == 3){interest = "Netflix and Chill"}
            if(array[swipeindex][1][11].value == 4){interest = "Coding"}
            if(array[swipeindex][1][11].value == 5){interest = "Money"}
  }
  catch(err) {
    alert("No more users for you, checkout out pornhub")
    username = "";
    firstname = "";
    lastname = "";
    age = "";
    gender = "";
    regionshow = "";
    interest = "";
  }
    swipeindex++;  
    
    

                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender
                document.getElementById("swiperegion").innerHTML = regionshow
                document.getElementById("swipeinterest").innerHTML = interest
}

var homepageButton = document.getElementById("homepage")
homepageButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "homepage.html"
})

//check for matches 

function checkformatches(){
    return new Promise((resolve, reject) => {

    fetch("http://localhost:7071/api/getlikes", {
        
    method: 'POST',
    body: JSON.stringify({
        loggedInId: localStorage.getItem("loggedIn"),
    }),
    
    headers: {
        "Content-Type": "application/json; charset-UTF-8"
    }
}) 
.then((response) => {
    resolve(response)
    return response.json()
})
.then((data) => {
    console.log(data)

    for (let index = 0; index < data.length; index++) {
        
        if(data[index][1].value == localStorage.getItem("swipeid")){
            var match = new Match (1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"))

            console.log("DET VIRKER !!!!")
            match.match();  
            alert("Dette er en notifikation om at du har et match med " + localStorage.getItem("swipefirstname") + ". Tillykke!");  

        }
    }
})
.catch(err => {
    reject(err)
    console.log(err)
})
})
}



var like = document.getElementById("like")

//der bliver nu ikke postet hvis man liker en man allerede har liket. Men det bliver stadig til et match, da checkformatches() kører
like.addEventListener("click", async function(e) {
    e.preventDefault()


     var vote = new Votes(1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"), "like")

    await vote.vote()
    

    await checkformatches()
    

    swipefunction()
})



var dislike = document.getElementById("dislike")


dislike.addEventListener("click", function(e) {
    e.preventDefault()

    var vote = new Votes(1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"), "dislike")

    vote.vote()
    
    swipefunction()
})





