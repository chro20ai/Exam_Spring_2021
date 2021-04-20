

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
    interestarray.puhs(4)
}
var money = document.getElementById("money")
if(money.checked){
    interestarray.push(5)
}

window.location = "login.html"
});

