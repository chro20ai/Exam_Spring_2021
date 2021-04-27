var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "adminUpdate.html";
})


//delete User
var deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()

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
})






