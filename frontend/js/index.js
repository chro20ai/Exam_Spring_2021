var form = document.getElementById("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var birthdate = document.getElementById("birthdate").value
    var fabrikId = document.getElementById("fabrik_id").value

    fetch("http://localhost:7071/api/user", {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            gender: gender,
            birthdate: birthdate,
            fabrikId: fabrikId
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
})