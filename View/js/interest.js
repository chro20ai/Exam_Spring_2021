

var interestarray = []


var form = document.getElementById("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()


var sport = document.getElementById("sport")
if(sport.checked){
    interestarray.push(1);
}
var art = document.getElementById("art")
if(art.checked){
    interestarray.push(2)
}
var netflixandchill = document.getElementById("netflixandchill")
if(netflixandchill.checked){
    interestarray.push(3)
}
var coding = document.getElementById("coding")
if(coding.checked){
    interestarray.push(4)
}
var money = document.getElementById("money")
if(money.checked){
    interestarray.push(5)
}

if(interestarray.length !== 1){
    interestarray = []
    return alert("Select one interest!")
}

localStorage.setItem('interest', interestarray[0])
    console.log(interestarray);
fetch("http://localhost:7071/api/postInterests", {
        
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem("loggedIn"),
                interest_id: interestarray[0]
            }),
            
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("DET VIRKEDE")
            window.location = "homepage.html";
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    

//window.location = "homepage.html"
);

