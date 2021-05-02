import { User as _User, Admin as _Admin} from '../../classes/classes.js';
const User = _User
const Admin = _Admin

var getButton = document.getElementById("getUser")

getButton.addEventListener('click', function(){

    var admin = new Admin() 

    admin.getUser() 
    
})


var form = document.getElementById("form1")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    var id = localStorage.getItem("dataid")
    var updateusername = document.getElementById("updateusername").value
    var updatepassword = document.getElementById("updatepassword").value
    var updatefirstname = document.getElementById("updatefirstname").value
    var updatelastname = document.getElementById("updatelastname").value
    var updatebirthdate = document.getElementById("updatebirthdate").value
    var updateregion = document.querySelector('input[name="region"]:checked').value
    var updategender = document.querySelector('input[name="gender"]:checked').value
    var updatelookingfor = document.querySelector('input[name="lookingfor"]:checked').value
    var rangeAge = document.querySelector('input[name="ageRange"]:checked').value


    var user = new User(id, updateusername, updatepassword, updatefirstname, updatelastname, updatebirthdate, updategender, updatelookingfor, rangeAge, updateregion)
    
    user.update()
    

})