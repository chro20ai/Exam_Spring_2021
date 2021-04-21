var swipe = document.getElementById("swipe")
var index = 0;
var swipeindex = 0; 
var region = localStorage.getItem("region")
var id = localStorage.getItem("loggedIn")
var lookingfor = localStorage.getItem("lookingfor")
var agerange = localStorage.getItem("agerange")

//import {Node, Graph} from '../classes/bfs'
import { Node as _Node, Graph as _Graph } from '../classes/bfs.js';
const Node = _Node
const Graph = _Graph

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

console.log(graph.ShortestPathBFS("nordjylland", "hovedstaden"))



//lav om til 3140 osv.
//lav agerange i localstorage
var array1825 = []
var array2630 = []
var array3140 = []
var array41 = []

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
                        if(age >= 18 && age <= 25){
                        array1825.push(data[i])
                        }
                        else if(age >= 26 && age <= 30){
                        array2630.push(data[i])
                        }
                        else if(age >= 31 && age <= 40){
                        array3140.push(data[i])
                        }    
                        else if(age >= 41){
                        array41.push(data[i])
                        }
                    }
                    console.log(array1825)
                    console.log(array2630)
                    console.log(array3140)
                    console.log(array41)
                    //console.log(data)
                })
            }
        )
        .catch(function(err){
        console.log(err)
        })
    }
    

swipe.addEventListener("click", function(e) {
    e.preventDefault()

var username;
var firstname;
var lastname;
var age;
var gender;


try {
    if(agerange == "18-25"){
        if(array1825[swipeindex][0].value == id){
            swipeindex++;
            }
            username = array1825[swipeindex][1].value
            firstname = array1825[swipeindex][3].value
            lastname = array1825[swipeindex][4].value
            age = getAge(array1825[swipeindex][5].value)
            gender = array1825[swipeindex][6].value    
    }
    else if(agerange == "26-30"){
        if(array2630[swipeindex][0].value == id){
        swipeindex++;
        }
        username = array2630[swipeindex][1].value
        firstname = array2630[swipeindex][3].value
        lastname = array2630[swipeindex][4].value
        age = getAge(array2630[swipeindex][5].value)
        gender = array2630[swipeindex][6].value
    }
    else if(agerange == "31-40"){
        if(array3140[swipeindex][0].value == id){
            swipeindex++;
            }
        username = array3140[swipeindex][1].value
        firstname = array3140[swipeindex][3].value
        lastname = array3140[swipeindex][4].value
        age = getAge(array3140[swipeindex][5].value)
        gender = array3140[swipeindex][6].value
    }
    else if(agerange == "41+"){
        if(array41[swipeindex][0].value == id){
            swipeindex++;
            }
        username = array41[swipeindex][1].value
        firstname = array41[swipeindex][3].value
        lastname = array41[swipeindex][4].value
        age = getAge(array41[swipeindex][5].value)
        gender = array41[swipeindex][6].value
    }
  }
  catch(err) {
    alert("No more users for you, checkout out pornhub")
    username = "";
    firstname = "";
    lastname = "";
    age = "";
    gender = "";
  }
    swipeindex++;  
    
    

                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender
})

var homepageButton = document.getElementById("homepage")
homepageButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "homepage.html"
})
