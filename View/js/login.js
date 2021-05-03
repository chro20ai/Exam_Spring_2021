//Vi importer user-klassen, laver et nyt user objekt af klassen og kalder metoden loginUser()
import { User as _User} from '../classes/classes.js';
const User = _User

var loginform = document.getElementById("loginform")

loginform.addEventListener("submit", function(e) {
    e.preventDefault()

    var loginUser = new User()

    loginUser.loginUser()
})
  
            
 
