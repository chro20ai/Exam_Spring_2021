
var adminloginform = document.getElementById("adminloginform")


adminloginform.addEventListener("submit", function(e) {
    e.preventDefault()

    var usernamelogin = document.getElementById("usernameid").value
    var passwordlogin = document.getElementById("passwordid").value
    

    fetch("http://localhost:7071/api/loginasadmin", {
        method: 'POST',
        body: JSON.stringify({
            username : usernamelogin,
            password : passwordlogin
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {
        localStorage.setItem('adminid', data[0].value);
        localStorage.setItem('adminusername', data[1].value);
        console.log(data + "yallah habibi")
        window.location = "admin.html";
    })
    .catch(err => {
        alert("There was an error. Check your username and password")
        console.log(err)
    })
})