var swipe = document.getElementById("swipe")
var swipeid = localStorage.getItem("swipeid")
var swipeindex = 0; 
var region = localStorage.getItem("region")
var id = localStorage.getItem("loggedIn")
var lookingfor = localStorage.getItem("lookingfor")
var agerange = localStorage.getItem("agerange")

//import {Node, Graph} from '../classes/bfs'
import { Node as _Node, Graph as _Graph } from '../classes/bfs.js';
import { Votes as _Votes, Match as _Match } from '../classes/classes.js';
const Node = _Node
const Graph = _Graph
const Votes = _Votes
const Match = _Match

let node = new Node()
let graph = new Graph()
graph.addNode("syddanmark")
graph.addNode("nordjylland")
graph.addNode("midtjylland")
graph.addNode("sjaelland")
graph.addNode("hovedstaden")

//Syddanmark
graph.addEdge("syddanmark", "midtjylland")
graph.addEdge("syddanmark", "sjaelland")
//Midtjylland
graph.addEdge("midtjylland", "syddanmark")
graph.addEdge("midtjylland", "nordjylland")
//Nordjylland 
graph.addEdge("nordjylland", "midtjylland")
//Sjælland
graph.addEdge("sjaelland", "syddanmark")
graph.addEdge("sjaelland", "hovedstaden")
//Hovedstaden
graph.addEdge("hovedstaden", "sjaelland")

//console.log(graph.ShortestPathBFS("nordjylland", "midtjylland"))


var array = []
var regionarray = []


function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;}

    window.onload = function(){
        fetch(`http://localhost:7071/api/swipe?lookingfor=${lookingfor}`)
        //fetch("http://localhost:7071/api/swipe")
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Something went wrong " + response.status);
                    return
                }
                response.json().then(function(data) {
                var i
                    for( i = 0; i < data.length; i ++){
                        var age = getAge(data[i][5].value)
                        //console.log(age)
                        if(age >= 18 && age <= 25 && agerange == "18-25"){
                        array.push(data[i])
                        }
                        else if(age >= 26 && age <= 30 && agerange == "26-30"){
                        array.push(data[i])
                        }
                        else if(age >= 31 && age <= 40 && agerange == "31-40"){
                        array.push(data[i])
                        }    
                        else if(age >= 41 && agerange == "41+"){
                        array.push(data[i])
                        }
                    }
                    
                    
                    
                    for( i = 0; i < array.length; i ++){
                            regionarray.push([graph.ShortestPathBFS(region, array[i][9].value).length, array[i]])
                    }
                    
                    
                    var sortedArray = regionarray.sort(function(a, b) {
                        return a[0] - b[0];
                      });
                    
                    
                    array = sortedArray
                    console.log(array[0][1])
                   
                    //regionarray.forEach(n => n.length);
                    //console.log(regionarray[0].length)
                    //console.log(sortedArray)
                    
                    
                })
            }
        )
        .catch(function(err){
        console.log(err)
        })
    }
    

swipe.addEventListener("click", function(e) {
    e.preventDefault()
swipefunction()

})

var homepageButton = document.getElementById("homepage")
homepageButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "homepage.html"
})

function swipefunction(){
var username;
var firstname;
var lastname;
var age;
var gender;
var regionshow;




try {
    if(array[swipeindex][1][0].value == id){
            swipeindex++;
            }
            localStorage.setItem("swipeid", array[swipeindex][1][0].value)
            localStorage.setItem("swipefirstname", array[swipeindex][1][3].value)
            username = array[swipeindex][1][1].value
            firstname = array[swipeindex][1][3].value
            lastname = array[swipeindex][1][4].value
            age = getAge(array[swipeindex][1][5].value)
            gender = array[swipeindex][1][6].value   
            regionshow =  array[swipeindex][1][9].value   
  }
  catch(err) {
    alert("No more users for you, checkout out pornhub")
    username = "";
    firstname = "";
    lastname = "";
    age = "";
    gender = "";
    regionshow = "";
  }
    swipeindex++;  
    
    

                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender
                document.getElementById("swiperegion").innerHTML = regionshow
}



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


like.addEventListener("click", async function(e) {
    e.preventDefault()


     var vote = new Votes(1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"), "like")

    await vote.vote()
    

    await checkformatches()
    

    //swipefunction()
})



var dislike = document.getElementById("dislike")


dislike.addEventListener("click", function(e) {
    e.preventDefault()

    var vote = new Votes(1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"), "dislike")

    vote.vote()
    
    swipefunction()
})





