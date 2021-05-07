export var arrayMatch = []


export class User{
    constructor(id, username, password, firstname, lastname, birthdate,  gender, lookingfor, rangeAge, region){
    this._id = id
    this._username = username
    this._password = password
    this._firstname = firstname 
    this._lastname = lastname
    this._birthdate = birthdate
    //this._address = address
    //Der har stået address her! Det skal vidst fjernes i databasen.
    this._gender = gender
    this._lookingfor = lookingfor
    this._rangeAge = rangeAge 
    this._region = region
    } 


//Calulate age metode 
    getAge(dateString){
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;}

// create metode 
    create(){
    var errormessage = ""; 
    //Errors hvis kravene for udfyldelse af oplysninger ikke er korrekte. 
    if (username.value == "") {
        errormessage += "Mangler at udfylde et brugernavn \n";}
    if (password.value == "" || password.value.length < 6){
        errormessage += "Din adgangskode skal bestå af mindst 6 tegn\n"}
    if (firstname.value == "") {
        errormessage += "Mangler at udfylde et fornavn\n"}
    if (lastname.value == "") {
        errormessage += "Mangler at udfylde et efternavn\n"}
    if(birthdate.value == "") {
        errormessage += "Angiv din fødselsdagsdato\n"}

    if(errormessage != ""){
        alert(errormessage)
    }

    else{
        fetch("http://localhost:7071/api/PostAndGetUser", {
        
            method: 'POST',
            body: JSON.stringify({
                username: this._username,
                password: this._password,
                firstname: this._firstname,
                lastname: this._lastname,
                birthdate: this._birthdate,
                gender: this._gender,
                lookingfor: this._lookingfor,
                agerange: this._rangeAge,
                region: this._region
            }),
            
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            window.location = "login.html";
        })
        .catch(err => {
            console.log(err)
        })
    }   
}

//Metode for login 
loginUser(){
    var usernamelogin = document.getElementById("usernameid").value
    var passwordlogin = document.getElementById("passwordid").value
    fetch("http://localhost:7071/api/Login", {
        method: 'POST',
        body: JSON.stringify({
            username : usernamelogin,
            password : passwordlogin
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {
        localStorage.setItem('loggedIn', data[0].value);
        localStorage.setItem('username', data[1].value);
        localStorage.setItem('region', data[9].value);
        localStorage.setItem('lookingfor', data[7].value);
        localStorage.setItem('agerange', data[8].value)
        
        if(data.length > 10){
            localStorage.setItem('interest', data[11].value)
        }
            window.location = "homepage.html";
    })
    .catch(err => {
        alert("There was an error. Check your username and password")
        console.log(err)
    })

}
//Metode for update
    update(){
        fetch("http://localhost:7071/api/Update",  {
        
            method: 'PUT',
            body: JSON.stringify({
                id: this._id,
                username: this._username,
                password: this._password,
                firstname: this._firstname,
                lastname: this._lastname,
                birthdate: this._birthdate,
                gender: this._gender,
                lookingfor: this._lookingfor,
                agerange: this._rangeAge,
                region: this._region
            }),
            
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            window.location = "homepage.html";
            
            alert('det virker')
    
        })
        .catch(err => {
            console.log(err)
        })
    }



    adminUpdate(){
        fetch("http://localhost:7071/api/Update",  {
        
            method: 'PUT',
            body: JSON.stringify({
                id: this._id,
                username: this._username,
                password: this._password,
                firstname: this._firstname,
                lastname: this._lastname,
                birthdate: this._birthdate,
                gender: this._gender,
                lookingfor: this._lookingfor,
                agerange: this._rangeAge,
                region: this._region
            }),
            
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            window.location = "admin.html";
            
            alert('det virker')
    
        })
        .catch(err => {
            console.log(err)
        })
    }




//Metode for delete
    deleteUser(){
        
        fetch("http://localhost:7071/api/deleteProfile", {
        method: 'DELETE',
        body: JSON.stringify({
            id: localStorage.getItem("loggedIn")
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {     
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("username")
        window.location = "login.html";
        alert("hvad foregår der :" + data)

    })     
    .catch(err => {
        console.log(err)
    })

    };
//Metode til at vælge interesser
    selectInterest(){
    var interestarray = []

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
        interestarray.push(4)
    }
    var money = document.getElementById("money")
    if(money.checked){
        interestarray.push(5)
    }
    
    if(interestarray.length !== 1){
        interestarray = []
        return alert("Select one interest!")
    }

    localStorage.setItem('interest', interestarray[0])
    console.log(interestarray);

    fetch("http://localhost:7071/api/postInterests", {
        
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem("loggedIn"),
                interest_id: interestarray[0]
            }),
            
              
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            window.location = "homepage.html";
    
    
        })
        .catch(err => {
            console.log(err)
        })
}


//Show matches metode
    showMatches(){
        document.getElementById("myTableData").style.visibility = "visible";
        document.getElementById("delete").style.visibility = "visible";
        document.getElementById("matchusername").style.visibility = "visible";
        document.getElementById("matchfirstname").style.visibility = "visible";
        document.getElementById("matchlastname").style.visibility = "visible";
        document.getElementById("matchage").style.visibility = "visible";
        document.getElementById("matchgender").style.visibility = "visible";
        document.getElementById("matchregion").style.visibility = "visible";
        document.getElementById("selection").style.visibility = "visible"; 
    
    fetch(`http://localhost:7071/api/getMatches?id=${localStorage.getItem("loggedIn")}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
                    console.log(data)
                    for (let index = 0; index < data.length; index++) {
        
                        var table = document.getElementById("myTableData");
                        var rowCount = table.rows.length;
                        var row = table.insertRow(rowCount);
                        var drop = document.getElementById("select1")
                        arrayMatch.push(data[index][7].value, data[index][1].value)
                         
                        //Til dropdown
                        var option = document.createElement("option");
                        option.text = data[index][1].value;
                        drop.add(option);
                    
                        /*
                        <option value="free">Free</option>
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        */

                        var user = new User()
                        row.insertCell(0).innerHTML= data[index][1].value;
                        row.insertCell(1).innerHTML= data[index][2].value;
                        row.insertCell(2).innerHTML= data[index][3].value;
                        row.insertCell(3).innerHTML= user.getAge(data[index][4].value);
                        row.insertCell(4).innerHTML= data[index][5].value;
                        row.insertCell(5).innerHTML= data[index][6].value; 
                        //drop.innerHTML=  `<select> <option value='${data[index][0].value}'>${data[index][1].value};</option></select>`; 
                        
                    }
                    
    
        })
        .catch(err => {
            console.log(err)
        })  
}

}








//Metode til at slette match --> virker ikke 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Admin klassen//
export class Admin extends User{
    constructor(username, password, id ){
                super(username, password)
                this._id = id
    }

    loginAdmin(){

        var usernamelogin = document.getElementById("usernameid").value
        var passwordlogin = document.getElementById("passwordid").value

        fetch("http://localhost:7071/api/loginasadmin", {
            method: 'POST',
            body: JSON.stringify({
                username : usernamelogin,
                password : passwordlogin
            }),
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            }
        }) 
        .then((response) => {
            return response.json() 
    
        })
        .then((data) => {
            localStorage.setItem('adminid', data[0].value);
            localStorage.setItem('adminusername', data[1].value);
            window.location = "admin.html";
        })
        .catch(err => {
            alert("There was an error. Check your username and password")
            console.log(err)
        })

    }

 
    adminDelete(){
        console.log(localStorage.getItem("dataid"))
        fetch("http://localhost:7071/api/deleteProfile", {
        method: 'DELETE',
        body: JSON.stringify({
            id: localStorage.getItem("dataid")
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {        
    alert("user is deleted")
        window.location = "admin.html";
    })     
    .catch(err => {
        console.log(err)
    })

    }


    getUser(){
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
                document.getElementById("datausername").innerHTML = "Username: " + userdata._username
                document.getElementById("datapassword").innerHTML = "Password: " + userdata._password
                document.getElementById("datafirstname").innerHTML = "Firstname: " + userdata._firstname
                document.getElementById("datalastname").innerHTML = "Lastname: " + userdata._lastname
                document.getElementById("databirthdate").innerHTML = "Age: " + userdata.getAge(userdata._birthdate)
                document.getElementById("datagender").innerHTML = "Gender: " + userdata._gender
                document.getElementById("datalookingfor").innerHTML = "Looking for: " + userdata._lookingfor
                document.getElementById("dataagerange").innerHTML = "Age range: " + userdata._rangeAge
                document.getElementById("dataregion").innerHTML = "Location: " + userdata._region

                
                localStorage.setItem('dataid', data[0].value);

                
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })

    }

//metode til at tælle user statestik
    userCount(){
    fetch("http://localhost:7071/api/usercounter")
    .then(
        function(response){
            if (response.status !== 200){
                console.log("Something went wrong " + response.status);
                return 
            }
            response.json().then(function(data) {
            document.getElementById("usercountshow").innerHTML = "There are "+ data[0].value + " users in the database"
            });
        }
    )
    .catch(function(err){
        console.log(err)
    })
    }



//Metode der laver statestik over match 
    matchCount(){

    fetch("http://localhost:7071/api/matchcounter")
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Something went wrong " + response.status);
                    return 
                }
                response.json().then(function(data) {
                document.getElementById("matchcountshow").innerHTML = "There are "+ data[0].value + " matches in the database"
                });
            }
        )
        .catch(function(err){
            console.log(err)
        })
    }


}


export class Votes{
    constructor(id, user_id, target_user_id, vote){
        this._id = id
        this._user_id = user_id
        this._target_user_id = target_user_id
        this._vote = vote
}
//Fetch er promise-based. 

//Metode til at like og dislike
vote(){
    return new Promise((resolve, reject) => {
    fetch("http://localhost:7071/api/Votes", {
        
    method: 'POST',
    body: JSON.stringify({
        user_id: this._user_id,
        target_user_id: this._target_user_id,
        vote: this._vote
    }),
    
    headers: {
        "Content-Type": "application/json; charset-UTF-8"
    }
}) 
.then((response) => {
    console.log(response)
    resolve(response) 
    return response.json()
})
.then((data) => {
    alert ("You have liked a user!")
})
.catch(err => {
   reject(err)
    console.log(err)
})
});
}

}


//////////////////////////////////////////////////////////////////////////////////////////////////
//Mmtch klasse//
export class Match{
    constructor(id, user_id_1, user_id_2){
        this._id = id        
        this._user_id_1 = user_id_1
        this._user_id_2 = user_id_2
    }


//Metode til at tjekke for match
match(){
    return new Promise((resolve, reject) => {
    fetch("http://localhost:7071/api/match", {
        
    method: 'POST',
    body: JSON.stringify({
        user_id_1: this._user_id_1,
        user_id_2: this._user_id_2
    }),
    
    headers: {
        "Content-Type": "application/json; charset-UTF-8"
    }
}) 
.then((response) => {
   resolve(response)
    return response.json()
})
.then((data) => {
    //console.log(data)
})
.catch(err => {
    reject(err)
    console.log(err)
})
})
}
}
