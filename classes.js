class User{
    constructor(ID ,userName, password, firstName, lastName, birthDate, gender, sexualOrientation, address){
    this._ID = ID
    this._userName = userName
    this._password = password
    this._firstName = firstName 
    this._lastName = lastName
    this._birthDate = birthDate
    this._gender = gender
    this._sexualOrientation = sexualOrientation
    this._address = address
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

