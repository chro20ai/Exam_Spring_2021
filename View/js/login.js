

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
        localStorage.setItem('username', data[1].value);
        localStorage.setItem('region', data[9].value);
        localStorage.setItem('lookingfor', data[7].value);
        localStorage.setItem('agerange', data[8].value)
        
        if(data.length > 10){
            localStorage.setItem('interest', data[11].value)
        }
        
            window.location = "homepage.html";
        
            
        
        
        //console.log(data)
        //window.location = "homepage.html";
    })
    .catch(err => {
        alert("There was an error. Check your username and password")
        console.log(err)
    })
})
  
            
 