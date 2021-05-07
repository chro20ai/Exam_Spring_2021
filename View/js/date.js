
 //ligger data i localstorage  
 var swipe = document.getElementById("swipe")
 var swipeindex = 0; 
 var region = localStorage.getItem("region")
 var id = localStorage.getItem("loggedIn")
 var lookingfor = localStorage.getItem("lookingfor")
 var agerange = localStorage.getItem("agerange")


 //importerer User, Node og Votes klasserne, så vi dermed også kan tilgå metoderne
 import { User as _User} from '../../Model/classes.js';
 import { Node as _Node, Graph as _Graph } from '../../Model/bfs.js';
 import { Votes as _Votes, Match as _Match } from '../../Model/classes.js';
 const User = _User
 const Node = _Node
 const Graph = _Graph
 const Votes = _Votes
 const Match = _Match


 //Vi definerer noderne = regioner
 let node = new Node()
 let graph = new Graph()
 graph.addNode("syddanmark")
 graph.addNode("nordjylland")
 graph.addNode("midtjylland")
 graph.addNode("sjaelland")
 graph.addNode("hovedstaden")


//Vi sætter grapf.edge mellem de regioner der grænser mod hinanden 
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



//Vi har samlet de arrays der bruges i algoritmen nedenfor 
 var array = []
 var newarray = []
 var testarray = []

 var nordjylland = []
 var midtjylland = []
 var syddanmark = []
 var sjaelland = []
 var hovedstaden = []

//Denne lange funktion kører, når man tilgår date.html. Her sorteres bruger og her er vores dating-algoritme. 
     window.onload = function(){
         //Her findes brugere efter det køn man kigger efter. 
         fetch(`http://localhost:7071/api/swipe?lookingfor=${lookingfor}`)
         .then(
             function(response){
                 if (response.status !== 200){
                     console.log("Something went wrong " + response.status);
                     return
                 }
                //Her returneres body'en som et JS objekt med respons.json. 
                 response.json().then(function(data) {
                 var i
                     for( i = 0; i < data.length; i ++){
                        //Her loopes igennem alle brugere, som i SQL-statementet allerede er sorteres efter køn. 
                        //Oprettes instans af User klasse. 
                         var swipeuser = new User (data[i][0].value, data[i][1].value, data[i][2].value, data[i][3].value, data[i][4].value, data[i][5].value, data[i][6].value, data[i][7].value, data[i][8].value, data[i][9].value)
                         //Metoden get age udregner en alder, så alderen altid vil være korrekt. 
                         var age =  swipeuser.getAge(swipeuser._birthdate)

                         //Her bliver loopes igennem alle brugere, 
                         //og hvis deres aldersgruppe stemmer overens med personen, der er logget ind, 
                         //så vil de blive indsat i et array, som senere vil blive vist når der swipes. 
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

                    //Med et for-loop sorteres efter hvilken region vedkommende bor i. 
                     for( var j = 0; j < array.length; j ++){
                        //Alle brugere, der kommer fra nordjylland, vil blive samlet i et array for denne region. 
                         if(array[j][9].value == "nordjylland"){
                        //Her tjekkes om bruger array[j] har en interesse tilfældes med den bruger der logget ind. 
                         if(localStorage.getItem("interest") == array[j][11].value){
                            //Hvis de har 1 interesse tilfældes, vil denne burger blive pushet i regionsarrayet med et 1-tal foran. 
                             nordjylland.push([1,array[j]])
                     }
                         else{
                            //Hvis de har 0 interesser tilfældes, vil de blive pushet i regions-arrayet med 0 foran for 0 interesser. 
                             nordjylland.push([0,array[j]])
                         }
                         //Nu sorteres de efter om de har 1 eller 0 interesser tilfældes. 
                         //Dem med flest interesser skal blive vist for brugeren først. 
                         nordjylland.sort(function(a, b) {return b[0] - a[0];});
                         }
                         //DETTE GENTAGES FOR ALLE 5 REGIONER. 

                         else if(array[j][9].value == "midtjylland"){
                         if(localStorage.getItem("interest") == array[j][11].value){
                             midtjylland.push([1,array[j]])
                     }
                         else{
                             midtjylland.push([0,array[j]])
                         }
                         midtjylland.sort(function(a, b) {return b[0] - a[0];});
                         }
                         else if(array[j][9].value == "syddanmark"){
                         if(localStorage.getItem("interest") == array[j][11].value){
                             syddanmark.push([1,array[j]])
                     }
                         else{
                             syddanmark.push([0,array[j]])
                         }
                         syddanmark.sort(function(a, b) {return b[0] - a[0];});
                         }  
                         else if(array[j][9].value == "sjaelland"){
                         if(localStorage.getItem("interest") == array[j][11].value){
                             sjaelland.push([1,array[j]])
                     }
                         else{
                             sjaelland.push([0,array[j]])
                         }
                         sjaelland.sort(function(a, b) {return b[0] - a[0];});
                         }     
                         else if(array[j][9].value == "hovedstaden"){
                             if(localStorage.getItem("interest") == array[j][11].value){
                                 hovedstaden.push([1,array[j]])
                         }
                         else{
                             hovedstaden.push([0,array[j]])
                         }
                         hovedstaden.sort(function(a, b) {return b[0] - a[0];});
                         
                         }
                     }
                     //Vi nu har sorteres de forskellige brugere efter hvilken region de bor i og hvor mange interesser de har tilfældes. 
                     //Nu benyttes BFS til at sortere den korteste afstand mellem regionen tilhørende brugeren der er logget ind og alle regioner. 
                     //.length bliver benyttes til at give et konkret tal som aftand fremfor at vise vejen fra a til b. 
                     newarray.push([graph.ShortestPathBFS(region, "nordjylland").length, nordjylland], [graph.ShortestPathBFS(region, "midtjylland").length, midtjylland], [graph.ShortestPathBFS(region, "syddanmark").length, syddanmark], [graph.ShortestPathBFS(region, "sjaelland").length, sjaelland], [graph.ShortestPathBFS(region, "hovedstaden").length, hovedstaden])


                    
                    console.log(newarray)

                    //Nu sorteres regionerne fra laveste til højeste tal.
                    //Laveste tal udtrykker korteste afstand. 
                    var sortedArray = newarray.sort(function(a, b) {
                     return a[0] - b[0];
                   });

                   //Algoritmen er færdigsorteret og denne rækkefølge skal vises for brugeren.
                   //Dog indsættes alle brugerne nu i et nyt array som kan blive vist i html. 
                     for (let i = 0; i < sortedArray.length; i++) {
                         for (let j = 0; j < sortedArray[i][1].length; j++) {
                                 testarray.push(sortedArray[i][1][j])
                         }
                     }
                     //Dette er det færdige array, som skal vises i swipefunktionen. 
                     array = testarray
                 })
             }
         )
         .catch(function(err){
         console.log(err)
         })
     }

//Når man trykker på knap, skal swipefunction() kaldes. 
swipe.addEventListener("click", function(e) {
    e.preventDefault()
swipefunction()

})

//Dette er funktionen, der kører når der trykkes swipe. 
function swipefunction(){
var username;
var firstname;
var lastname;
var age;
var gender;
var regionshow;
var interest;


var swipeuser = new User ()

//Her vises alle brugerne fra array. 
try {
    //Gør din egen bruger ikke kan blie vist. 
    if(array[swipeindex][1][0].value == id){
            swipeindex++;
            }

            //Følgende linjer er hvad der skal vises for brugeren: 

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
    //Catch benyttes til at slå ud når der ikke er flere brugere tilbage i array. 
    alert("No more users for you!")
    username = "";
    firstname = "";
    lastname = "";
    age = "";
    gender = "";
    regionshow = "";
    interest = "";
  }
    //Swipeindex plusses med 1 hver gang der trykkes swipe. 
    swipeindex++;  
    
    
                //innerHTML sørger for informationerne vises på siden. 
                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender
                document.getElementById("swiperegion").innerHTML = regionshow
                document.getElementById("swipeinterest").innerHTML = interest
}

//Knap til at komme tilbage på homepage. 
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
    

})



var dislike = document.getElementById("dislike")


dislike.addEventListener("click", function(e) {
    e.preventDefault()

    var vote = new Votes(1, localStorage.getItem("loggedIn"), localStorage.getItem("swipeid"), "dislike")

    vote.vote()
    

})





