var swipe = document.getElementById("swipe")
var index = 0;
var region = localStorage.getItem("region")
var id = localStorage.getItem("loggedIn")
var lookingfor = localStorage.getItem("lookingfor")
var agerange = localStorage.getItem("agerange")

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

swipe.addEventListener("click", function(e) {
    e.preventDefault()
    
    fetch(`http://localhost:7071/api/swipe?lookingfor=${lookingfor}`)
    //fetch("http://localhost:7071/api/swipe")
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return
            }
            
            response.json().then(function(data) {
                //console.log("under dette er date.js data")
                //console.log(data)
                //id ++
                /*if(isNaN(id)){
                    id ++ 
                }*/
                if(id == data[index][0].value){
                    index ++
                }
                
                


                var username = data[index][1].value
                var firstname = data[index][2].value
                var lastname = data[index][3].value
                var birthdate = data[index][5].value
                var gender = data[index][6].value

                var age = getAge(birthdate)

                for( i = 0; i < data.length; i ++){
                    var age = getAge(data[i][5].value)
                    console.log(age)
                    if(age >= 18 && age <= 25){
                    array1825.push(data[i][1].value)
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
                


                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender

                index ++


            })
        }
    )

    .catch(function(err){
    console.log(err)
    })
})

var homepageButton = document.getElementById("homepage")
homepageButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "homepage.html"
})
