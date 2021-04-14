var deleteButton = document.getElementById("delete")
var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "update.html";
})

var logOutButton = document.getElementById("logout")
logOutButton.addEventListener("click", function(e) {
    e.preventDefault()
    localStorage.removeItem("loggedIn")
    window.location = "login.html"
})

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
        //localStorage.removeItem("loggedIn")
        console.log(data)
        //window.location = "login.html";
    })     
    .catch(err => {
        console.log(err)
    })
})

   
            
 
