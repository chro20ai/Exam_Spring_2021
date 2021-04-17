const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config);

//Start DB
function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err);
                throw err;
            }
            else{
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}
module.exports.sqlConnection = connection
module.exports.startDb = startDb;

//Når man opretter en bruger 
function insert(payload){
    return new Promise((resolve, reject) => {
    const sql = `INSERT INTO [eksamen].[user] (username, password, firstname, lastname, birthdate, gender, interest, agerange, region) VALUES (@username, @password, @firstname, @lastname, @birthdate, @gender, @interest, @agerange, @region)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('interest', TYPES.VarChar, payload.interest)
        request.addParameter('agerange', TYPES.VarChar, payload.agerange)
        request.addParameter('region', TYPES.VarChar, payload.region)

        request.on('requestCompleted', (row) => {
            console.log('Login succeeded', row)
            resolve('User inserted', row)
        });

    connection.execSql(request)
//yallah

    });
}
module.exports.insert = insert;

//Bruges til get. 
function select(username){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [eksamen].[user] where username = @username'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('username', TYPES.VarChar, username)

        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)    
        })
    
}
module.exports.select = select;

//Logge ind
function insertlogin(payload){
    
    return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM [eksamen].[user] WHERE username = @username and password = @password"; 
            const request = new Request(sql, (err, rowcount) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
                if (rowcount == 0){
                    reject(err)
                    console.log(err)
                }
            });
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        
        
        request.on('row', (columns) => {
            resolve(columns)
        });

    connection.execSql(request)


    });
}
module.exports.insertlogin = insertlogin;



//Delete user
function deleteStatement(id1){
    return new Promise((resolve, reject) => {
    const sql = "DELETE FROM [eksamen].[user] WHERE id = @id"; 
        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }}); 
                request.addParameter('id', TYPES.Int, id1)     
                request.on('row', (columns) => {
                resolve(columns)
            });
    connection.execSql(request)


    });
}
module.exports.deleteStatement = deleteStatement;

//Update user
function updateStatement(payload){
    return new Promise((resolve, reject) => {
        console.log(payload)
        
    const sql = "UPDATE eksamen.[user] SET username = @updateusername, password = @updatepassword, firstname = @updatefirstname, lastname = @updatelastname, birthdate = @updatebirthdate, gender = @updategender, interest = @interest, agerange = @agerange, region = @region WHERE id = @id"
        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }}); 
            request.addParameter('updateusername', TYPES.VarChar, payload.username)
            request.addParameter('updatepassword', TYPES.VarChar, payload.password)
            request.addParameter('updatefirstname', TYPES.VarChar, payload.firstname)
            request.addParameter('updatelastname', TYPES.VarChar, payload.lastname)
            request.addParameter('updatebirthdate', TYPES.Date, payload.birthdate)
            request.addParameter('updategender', TYPES.VarChar, payload.gender)
            request.addParameter('interest', TYPES.VarChar, payload.interest)
            request.addParameter('agerange', TYPES.VarChar, payload.agerange)
            request.addParameter('region', TYPES.VarChar, payload.region)
            request.addParameter('id', TYPES.Int, payload.id)     
            
            request.on('requestCompleted', (row) => {
                //console.log('Update succeeded', row)
                resolve('User updated', row)
            });
    connection.execSql(request)


    });
}
module.exports.updateStatement = updateStatement;


//Bruges til get swipe. 
function swipe(id){
    //console.log(id)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [eksamen].[user] where id = @id'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('id', TYPES.Int, id)

        request.on('row', (columns) => {
            resolve(columns)
            console.log("id: " + columns[0].value)
            console.log("username: " + columns[1].value)
            console.log("password: " + columns[2].value)
            console.log("firstname: " + columns[3].value)
            console.log("lastname: " + columns[4].value)
            console.log("birthdate: " + columns[5].value)
            console.log("gender: " + columns[6].value)
            console.log("interest: " + columns[7].value)
            console.log("agerange: " + columns[8].value)
            console.log("region: " + columns[9].value)


            
            
        });
        connection.execSql(request)    
        })
    
}
module.exports.swipe = swipe;

function sortingalgorithm(){
        
}