
export class User{
    constructor(id, username, password, firstname, lastname, birthdate, address, gender){
    this._id = id
    this._username = username
    this._password = password
    this._firstname = firstname 
    this._lastname = lastname
    this._birthdate = birthdate
    this._address = address
    this._gender = gender
    
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

