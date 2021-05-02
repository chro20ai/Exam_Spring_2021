import { User as _User} from '../classes/classes.js';
const User = _User


var form = document.getElementById("form")
form.addEventListener("submit", function(e) {
    e.preventDefault()

var interest = new User()

interest.selectInterest()

});

