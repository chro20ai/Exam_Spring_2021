var swipe = document.getElementById("swipe")

swipe.addEventListener("click", function(e) {
    e.preventDefault()
    var id = 1;
    fetch(`http://localhost:7071/api/swipe?id=${id}`)
    .then(
        function(response){
            if (response.staus !== 200){
                console.log("Something went wrong " + response.status);
                return
            }
            
            response.json().then(function(data) {
                console.log(data)

                var username = data[1].value
                var firstname = data[3].value
                var lastname = data[3].value
                var age = data[4].value
                var gender = data[6].value



                document.getElementById("swipeusername").innerHTML = username
                document.getElementById("swipefirstname").innerHTML = firstname
                document.getElementById("swipelastname").innerHTML = lastname
                document.getElementById("swipeage").innerHTML = age
                document.getElementById("swipegender").innerHTML = gender


            })
        }
    ).catch(function(err){
        console.log(err)
    })
})

var homepageButton = document.getElementById("homepage")
homepageButton.addEventListener("click", function(e) {
    e.preventDefault()
    window.location = "homepage.html"
})
