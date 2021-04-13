var deleteButton = document.getElementById("delete")
console.log(deleteButton)
console.log("hej1")

deleteButton.addEventListener("click", function(e) {
    e.preventDefault()

    var id = localStorage.getItem("loggedIn")
    console.log(id)
    fetch(`http://localhost:7071/api/deleteProfile?id=${id}`, {
        //fetch("http://localhost:7071/api/deleteProfile?id=", + localStorage.getItem("loggedIn") {
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

   
            
 
