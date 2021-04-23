
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

}

export class Votes{
    constructor(id, user_id, target_user_id, vote){
        this._id = id
        this._user_id = user_id
        this._target_user_id = target_user_id
        this._vote = vote
}

vote(){
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
    return response.json()
})
.then((data) => {
    //console.log(data)
})
.catch(err => {
    console.log(err)
})
}

}

export class Match{
    constructor(id, user_id_1, user_id_2){
        this._id = id        
        this._user_id_1 = user_id_1
        this._user_id_2 = user_id_2
    }

match(){
    fetch("http://localhost:7071/api/Votes", {
        
    method: 'POST',
    body: JSON.stringify({
        id: this._user_id,
        user_id_1: this._user_id_1,
        user_id_2: this._user_id_2
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
})
.catch(err => {
    console.log(err)
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

