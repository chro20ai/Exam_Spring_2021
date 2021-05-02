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
            window.location = "interest.html";
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
            window.location = "admin.html";
            alert('det virker')
    
        })
        .catch(err => {
            console.log(err)
        })
    }


//Metode for delete
    deleteUser(){
        var id = localStorage.getItem("loggedIn")
        console.log(id)
        fetch("http://localhost:7071/api/deleteProfile", {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    .then((response) => {
        return response.json()

    })
    .then((data) => {     
        console.log(data)   
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("username")
        window.location = "login.html";

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
                        row.insertCell(3).innerHTML= user.getAge(user._birthdate);
                        console.log(user.getAge())
                        row.insertCell(4).innerHTML= data[index][5].value;
                        row.insertCell(5).innerHTML= data[index][6].value; 
                        //drop.innerHTML=  `<select> <option value='${data[index][0].value}'>${data[index][1].value};</option></select>`; 
                        
                    }
                    arrayMatch = []
    
        })
        .catch(err => {
            console.log(err)
        })  
}

//Metode til at slette match 
deleteMatch(){
    arrayMatch = []
    var matchid

    var selectdelete = document.getElementById("select1");
    var selected = selectdelete.options[selectdelete.selectedIndex].text;
    arrayMatch
    
    var i
    for( i=0 ; i < arrayMatch.length ; i ++){
        if(arrayMatch[i] == selected){
            matchid = arrayMatch[i-1]
console.log(matchid)
        }
    }
    
    fetch("http://localhost:7071/api/deleteMatch", {
        method: 'DELETE',
        body: JSON.stringify({
            id: matchid
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    }) 
    
    .then((response) => {
        return response.json()

    })
    .then((data) => {    

       console.log(data)
    })     
    .catch(err => {
        console.log(err)
    })

}

}

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
 
    deleteUser(){
    var id = localStorage.getItem("dataid")

        fetch("http://localhost:7071/api/deleteProfile", {
        method: 'DELETE',
        body: JSON.stringify({
            id: id
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
                document.getElementById("datausername").innerHTML = userdata._username
                document.getElementById("datapassword").innerHTML = userdata._password
                document.getElementById("datafirstname").innerHTML = userdata._firstname
                document.getElementById("datalastname").innerHTML = userdata._lastname
                document.getElementById("databirthdate").innerHTML = userdata.getAge(userdata._birthdate)
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
    //console.log(data)
})
.catch(err => {
   reject(err)
    console.log(err)
})
});
}

}

export class Match{
    constructor(id, user_id_1, user_id_2){
        this._id = id        
        this._user_id_1 = user_id_1
        this._user_id_2 = user_id_2
    }

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

/*class Address{
    constructor(ID, street, number, city, postalCode, country){
        this._ID = ID
        this._street = street
        this._number = number
        this._city = city
        this._postalCode = postalCode
        this._country = country
    }
}*/

