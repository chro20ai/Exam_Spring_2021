//import
import { Admin as _Admin} from '../../../Model/classes.js';
const Admin = _Admin


var getButton = document.getElementById("getUser")

//Tager imod et username, og viser profil frem
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
    //Metode til at slette en bruger
    admin.adminDelete()
})


