//import
import { Admin as _Admin} from '../../classes/classes.js';
const Admin = _Admin


var getButton = document.getElementById("getUser")

getButton.addEventListener('click', function(){

    var admin = new Admin() 

    admin.getUser() 
    
})

//delete User
localStorage.getItem("dataid")

var deleteButton = document.getElementById("deleteUser")

deleteButton.addEventListener("click", function(e) {
    e.preventDefault()

    var admin = new Admin()
    admin.adminDelete()
})


