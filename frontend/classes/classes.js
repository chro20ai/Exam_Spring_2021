function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;}

function deleteMatch(id){
    alert(id)
}

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

    /*
    if(gender.value == "") {
        errormessage += "Angiv dit køn\n"}
    if(lookingfor.value == "") {
         errormessage += "Angiv hvilket køn du vil bumle\n"}
    if(rangeAge.value == "") {
        errormessage += "Angiv hvilken alder du vil bumle\n"}
    if(region.value == "") {
        errormessage += "Angiv hvor du kommer fra\n"}
    */

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
    
        })
        .catch(err => {
            console.log(err)
        })
    }

    delete(){
    }


    //Show matches
    showMatches(){
    document.getElementById("matchusername").style.visibility = "visible";
    document.getElementById("matchfirstname").style.visibility = "visible";
    document.getElementById("matchlastname").style.visibility = "visible";
    document.getElementById("matchage").style.visibility = "visible";
    document.getElementById("matchgender").style.visibility = "visible";
    document.getElementById("matchregion").style.visibility = "visible";

    
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


                    
                        row.insertCell(0).innerHTML= `<input type="button" value = "Delete" onclick=${deleteMatch(data[index][0].value)}>`;
                        row.insertCell(1).innerHTML= data[index][1].value;
                        row.insertCell(2).innerHTML= data[index][2].value;
                        row.insertCell(3).innerHTML= data[index][3].value;
                        row.insertCell(4).innerHTML= getAge(data[index][4].value);
                        row.insertCell(5).innerHTML= data[index][5].value;
                        row.insertCell(6).innerHTML= data[index][6].value;
                    }
                  
    
        })
        .catch(err => {
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

