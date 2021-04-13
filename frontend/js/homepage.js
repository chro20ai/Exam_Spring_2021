var deleteButton = document.getElementById("delete")
var updateUser = document.getElementById("update")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "update.html";
})

deleteButton.addEventListener("click", function(e) {
    e.preventDefault()

    var id = localStorage.getItem("loggedIn")
    console.log(id)
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
        console.log("testinggggg")
        return response.json()

    })
    .then((data) => {
        console.log(data)})
    .catch(err => {
        console.log(err)
    })
})

   
            
 
