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
    const sql = `INSERT INTO [eksamen].[user] (username, password, firstname, lastname, birthdate, gender, lookingfor, agerange, region) VALUES (@username, @password, @firstname, @lastname, @birthdate, @gender, @lookingfor, @agerange, @region)`
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
        request.addParameter('lookingfor', TYPES.VarChar, payload.lookingfor)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('agerange', TYPES.VarChar, payload.agerange)
        request.addParameter('region', TYPES.VarChar, payload.region)

        request.on('requestCompleted', (row) => {
            console.log('Login succeeded', row)
            resolve('User inserted', row)
        });

    connection.execSql(request)


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
        
    const sql = "UPDATE eksamen.[user] SET username = @updateusername, password = @updatepassword, firstname = @updatefirstname, lastname = @updatelastname, birthdate = @updatebirthdate, gender = @updategender, lookingfor = @lookingfor, agerange = @agerange, region = @region WHERE id = @id"
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
            request.addParameter('lookingfor', TYPES.VarChar, payload.lookingfor)
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




var array = []
//Bruges til get swipe. 
function swipe(lookingfor){
    //console.log(id)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [eksamen].[user] where gender = @lookingfor'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('lookingfor', TYPES.VarChar, lookingfor)


        request.on('row', function(columns) {
            /*columns.forEach(function(column) {
             array.push(column.value)
              
              
            });*/
           // console.log(columns)
            array.push(columns)
             //array.push(columns[0].value, columns[9].value)
             
             //console.log(array)
            
       /* request.on('row', (columns) => {
            resolve(columns)
            console.log("id'er: " + columns[0].value)
            console.log("username: " + columns[1].value)
            console.log("password: " + columns[2].value)
            console.log("firstname: " + columns[3].value)
            console.log("lastname: " + columns[4].value)
            console.log("birthdate: " + columns[5].value)
            console.log("gender: " + columns[6].value)
            console.log("interest: " + columns[7].value)
            console.log("agerange: " + columns[8].value)
            console.log("region: " + columns[9].value)*/


            
            
        }); 
        request.on('done', (rowCount) => {
            console.log('Done is called!');
          });
        
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
            //console.log(array)
            resolve(array)
          });
        connection.execSql(request)    
        })
    
}
module.exports.swipe = swipe;






//Interests
function insertInterest(payload){
    return new Promise((resolve, reject) => {
    const sql = `INSERT INTO [eksamen].[user_interest] (user_id, interest_id)  VALUES (@user_id, @interest_id), (@user_id, @interest_id2) `
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('user_id', TYPES.Int, payload.user_id)
        request.addParameter('interest_id', TYPES.Int, payload.interest_id)
        request.addParameter('interest_id2', TYPES.Int, payload.interest_id2)
    
        request.on('requestCompleted', (row) => {
            console.log('Interests succeded', row)
            resolve('Interests inserted', row)
        });

    connection.execSql(request)
    });
}
module.exports.insertInterest = insertInterest
;

function votefunction(payload){
    
    return new Promise((resolve, reject) => {
    const sql = "INSERT INTO [eksamen].[votes] (user_id, target_user_id, vote) VALUES (@user_id, @target_user_id, @vote)" 
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
        request.addParameter('user_id', TYPES.Int, payload.user_id)
        request.addParameter('target_user_id', TYPES.Int, payload.target_user_id)
        request.addParameter('vote', TYPES.VarChar, payload.vote)
        
        
        request.on('requestCompleted', (row) => {
            //console.log("HEEEEEEEJ")
            resolve('vote inserted', row)
        });

    connection.execSql(request)


    });
}

module.exports.votefunction = votefunction;

var array1 = []
//Check for matches
function posiblematch(payload){
    console.log(payload)
    return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM [eksamen].[votes] WHERE target_user_id = @loggedIn AND vote = 'like'"; 
            const request = new Request(sql, (err, rowcount) => {
                if (err){
                    reject(err)
                    //console.log(err)
                }
            });
        request.addParameter('loggedIn', TYPES.Int, payload.loggedInId)
        
        
        request.on('row', function(columns) {
        
            array1.push(columns)
            
        }); 
        request.on('done', (rowCount) => {
            console.log('Done is called!');
          });
        
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
            
            resolve(array1)
            array1 = []
          });

    connection.execSql(request)


    });
}
module.exports.posiblematch = posiblematch;


function matchfunction(payload){

    return new Promise((resolve, reject) => {
        //laves om til insert funkction
    const sql = "INSERT INTO [eksamen].[match] (user_id_1, user_id_2) VALUES (@user_id_1, @user_id_2)" 
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
        request.addParameter('user_id_1', TYPES.Int, payload.user_id_1)
        request.addParameter('user_id_2', TYPES.Int, payload.user_id_2)
        
        
        
        request.on('row', (columns) => {
            resolve(columns)
        });

    connection.execSql(request)


    });
}

module.exports.matchfunction = matchfunction;
var array2 = []
//Bruges til get matches. 
function getMatches(id){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT(CASE WHEN [eksamen].[match].user_id_1 = @id THEN [eksamen].[match].user_id_2 WHEN [eksamen].[match].user_id_2 = @id THEN [eksamen].[match].user_id_1 END), [eksamen].[user].username, [eksamen].[user].firstname, [eksamen].[user].lastname, [eksamen].[user].birthdate, [eksamen].[user].gender, [eksamen].[user].region, [eksamen].[match].id FROM [eksamen].[match] INNER JOIN [eksamen].[user] ON (CASE WHEN [eksamen].[match].user_id_1 = @id THEN [eksamen].[match].user_id_2 WHEN [eksamen].[match].user_id_2 = @id THEN [eksamen].[match].user_id_1 END) = [eksamen].[user].id'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('id', TYPES.Int, id)

        request.on('row', function(columns) {
            array2.push(columns)
        }); 
        request.on('done', (rowCount) => {
            console.log('Done is called!');
          });
        
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
            
            resolve(array2)
            array2 = []
          });
        connection.execSql(request)    
        })
    
}
module.exports.getMatches = getMatches;

//Delete match
function deleteMatchStatement(id){
    return new Promise((resolve, reject) => {
    const sql = "DELETE FROM [eksamen].[match] WHERE id = @id"; 
        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }}); 
                request.addParameter('id', TYPES.Int, id)     
                request.on('row', (columns) => {
                resolve(columns)
            });
    connection.execSql(request)


    });
}
module.exports.deleteMatchStatement = deleteMatchStatement;