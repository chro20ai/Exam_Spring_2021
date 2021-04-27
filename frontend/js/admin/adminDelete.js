//delete User
var deleteButton = document.getElementById("deleteUser")
deleteButton.addEventListener("click", function(e) {
    e.preventDefault()


    var id = localStorage.getItem("dataid")
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
        return response.json()

    })
    .then((data) => {        
       
        window.location = "admin.html";
    })     
    .catch(err => {
        console.log(err)
    })
})
