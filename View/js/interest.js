//importere User-klassen
import { User as _User} from '../../Model/classes.js';
const User = _User

//vi laver ny instans af user-klassen og så kalder vi metoden selectInterest()
var form = document.getElementById("form")
form.addEventListener("submit", function(e) {
    e.preventDefault()

var interest = new User()

//Metode til at poste den valgte interesse. 
interest.selectInterest()

});

