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

//console.log(graph.ShortestPathBFS("nordjylland", "midtjylland"))

function sort(array){
    
    //I create a new array that is empty for now
    //This array will have the array sorted
    const arr2 = [];
    //I set a variable that sets the max of an array and minimum of the array
    let pos = 0, max = array[0][0].length, min = array[0][0].length;

    //I make a for-loop that loops through the array
    for (let j=0; j< array.length; j++){
        //If the max value is less than the length of the array I will set the max value to be equal to the the index j of the array
        //In this way I find the max value in the array
        if(max < array[0][j].length){
            max = array[0][j].length
        }
    }

    //I insert a double for loop that will loop through the length of the array inserted
    for (let i = 0; i<array.length; i++){
        for (let k = 0; k < array.length; k++){
            //I then check if the for every index of the array if it is different from null
            //This is because I put the array to be null if I already used it
            if(array[0][k] != null){
                //and I check if the minimum value is less then the index of the array
                if (min > array[0][k]){
                    //If so I set the new minimum value
                    min = array[0][k];
                        //I define the position for the individual index to be the position of that index
                        pos = k;
                        console.log(array)
            }
        }
    }
    //I know create a new array with the index i to return 
    //I set it to the minimum value of the first array that was inserted
    //This value was found above and will keep running until the inserted array is empty
    arr2[i] = min;
    //Now I set every index that i defined as pos to be equal to null
    //This means that it will sort from high to low in to the new index
    //It also means that when the function has taken the lowest number it will put the value of the inserted array to null
    array[0][pos] = null
    //I know set the new minimum value to the max value to get the maximum value last in the array
    min = max;
}

return console.log(arr2);
}



var array = []
var regionarray = []
var sjaellandarray = []
var syddanmarkarray = []
var nordjyllandarray = []
var midtjyllandarray = []
var hovedstadenarray = []
var totalarray = []

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
                    //console.log(array)
                    
                    
                    for( i = 0; i < array.length; i ++){
                            regionarray.push([graph.ShortestPathBFS(region, array[i][9].value).length, array[i]])
                    }
                    //var arraynytnyt = [[123, 3], [745, 4], [643, 5], [643, 2]];
                    /*
                    var sortedArray = regionarray.sort(function(a, b) {
                        return a[0] - b[0];
                      });
                      
                    console.log(sortedArray)
                    */
                    console.log(regionarray)
                   
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

var username;
var firstname;
var lastname;
var age;
var gender;




try {
    if(array[swipeindex][0].value == id){
            swipeindex++;
            }
            username = array[swipeindex][1].value
            firstname = array[swipeindex][3].value
            lastname = array[swipeindex][4].value
            age = getAge(array[swipeindex][5].value)
            gender = array[swipeindex][6].value    
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
