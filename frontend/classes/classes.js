
export class User{
    constructor(id, username, password, firstname, lastname, birthdate, address, gender, interest, rangeAge){
    this._id = id
    this._username = username
    this._password = password
    this._firstname = firstname 
    this._lastname = lastname
    this._birthdate = birthdate
    this._address = address
    this._gender = gender
    this._ratiointerest = interest
    this._rangeAge = rangeAge 
    
    } 
    create(){
        fetch("http://localhost:7071/api/PostAndGetUser", {
        
            method: 'POST',
            body: JSON.stringify({
                username: this._username,
                password: this._password,
                firstname: this._firstname,
                lastname: this._lastname,
                birthdate: this._birthdate,
                gender: this._gender,
                interest: this._ratiointerest,
                agerange: this._rangeAge
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
            window.location = "login.html";
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    update(){
    }

    delete(){
    }

}

class Like{
    constructor(ID, userID, likedID){
        this._ID = ID
        this._userID = userID
        this._likedID = likedID
}


}

class Match{
    constructor(ID, userID1, userID2){
        this._ID = ID        
        this._userID1 = userID1
        this._userID2 = userID2
    }
}

class Address{
    constructor(ID, street, number, city, postalCode, country){
        this._ID = ID
        this._street = street
        this._number = number
        this._city = city
        this._postalCode = postalCode
        this._country = country
    }
}


