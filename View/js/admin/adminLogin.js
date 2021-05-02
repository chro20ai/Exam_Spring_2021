
import { Admin as _Admin} from '../../classes/classes.js';
const Admin = _Admin

var adminloginform = document.getElementById("adminloginform")

adminloginform.addEventListener("submit", function(e) {
    e.preventDefault()

    var adminlogin = new Admin()

    adminlogin.loginAdmin()
    
})