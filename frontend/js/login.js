

var loginform = document.getElementById("loginform")


loginform.addEventListener("submit", function(e) {
    e.preventDefault()

    var usernamelogin = document.getElementById("usernameid").value
    var passwordlogin = document.getElementById("passwordid").value
    
    

    fetch("http://localhost:7071/api/Login", {
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
        localStorage.setItem('loggedIn', data[0].value);
        //localStorage.setItem('username', user.username);
        console.log(data)
        window.location = "homepage.html";
    })
    .catch(err => {
        alert("Username and password is wrong")
        console.log(err)
    })
})

   
            
 