var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "adminUpdate.html";
})


//delete User
var deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "adminDelete.html";


    /*
    var id = localStorage.getItem("dataid")
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
    */
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


var usercount = document.getElementById("usercount")
usercount.addEventListener("click", function(e) {
    e.preventDefault()
  

    fetch("http://localhost:7071/api/usercounter")
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }


            response.json().then(function(data) {

            console.log(data)


                document.getElementById("usercountshow").innerHTML = "There are "+ data[0].value + " users in the database"
                

                
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
})

var matchcount = document.getElementById("matchcount")
matchcount.addEventListener("click", function(e) {
    e.preventDefault()
    
    fetch("http://localhost:7071/api/matchcounter")
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }


            response.json().then(function(data) {

            console.log(data)


                document.getElementById("matchcountshow").innerHTML = "There are "+ data[0].value + " matches in the database"
                

                
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
    
})


