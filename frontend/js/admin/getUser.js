import { User as _User} from '../../classes/classes.js';
const User = _User

var getButton = document.getElementById("getUser")

getButton.addEventListener('click', function(){
    
    var username1 = document.getElementById("username").value
    fetch(`http://localhost:7071/api/PostAndGetUser?username=${username1}`)
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }


            response.json().then(function(data) {

            console.log(data)

            var userdata = new User (data[0].value, data[1].value, data[2].value, data[3].value, data[4].value, data[5].value, data[6].value, data[7].value, data[8].value, data[9].value)

                document.getElementById("dataid").innerHTML = userdata._id
                document.getElementById("datausername").innerHTML = userdata._username
                document.getElementById("datapassword").innerHTML = userdata._password
                document.getElementById("datafirstname").innerHTML = userdata._firstname
                document.getElementById("datalastname").innerHTML = userdata._lastname
                document.getElementById("databirthdate").innerHTML = userdata._birthdate
                document.getElementById("datagender").innerHTML = userdata._gender
                document.getElementById("datalookingfor").innerHTML = userdata._lookingfor
                document.getElementById("dataagerange").innerHTML = userdata._agerange
                document.getElementById("dataregion").innerHTML = userdata._region

                
                localStorage.setItem('dataid', data[0].value);

                
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
})