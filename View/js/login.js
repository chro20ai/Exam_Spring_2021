//Vi importer user-klassen, laver et nyt user objekt af klassen og kalder metoden loginUser()
import { User as _User} from '../../Model/classes.js';
const User = _User

var loginform = document.getElementById("loginform")

//Når man trykker log in. 
loginform.addEventListener("submit", function(e) {
    e.preventDefault()

    var loginUser = new User()

    //Metode validerer username og password. 
    loginUser.loginUser()
})
  
            
 
