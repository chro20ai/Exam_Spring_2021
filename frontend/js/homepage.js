var deleteButton = document.getElementById("delete")


deleteButton.addEventListener("submit", function(e) {
    e.preventDefault()

    var id = //Skal hentes fra localstorage
    fetch(`http://localhost:7071/api/deleteProfile?id=${id}`, {
        method: 'DELETE',
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

   
            
 
