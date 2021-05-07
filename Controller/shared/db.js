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
                
                resolve();
                return "Connected"
            }
        })
        connection.connect();
    })
}
module.exports.sqlConnection = connection
module.exports.startDb = startDb;

//Når man opretter en bruger 
function insert(payload){
    //Promise
    return new Promise((resolve, reject) => {
    //SQL-statement 
    const sql = `INSERT INTO [eksamen].[user] (username, password, firstname, lastname, birthdate, gender, lookingfor, agerange, region) VALUES (@username, @password, @firstname, @lastname, @birthdate, @gender, @lookingfor, @agerange, @region)`
        //Selve requestet, som tager 2 parametre. 
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

        //request.on, til at der skal ske, når requestet er eksekveret. 
        //RequestCompleted, til at fortælle request er slut. 
        request.on('requestCompleted', (row) => {
            console.log('Login succeeded', row)
            //Med resolve() returneres promise.
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

        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            //Med resolve() returneres promise.
            resolve(columns)
        });

        connection.execSql(request)    
        })
    

}
module.exports.select = select;

//Logge ind som user
function insertlogin(payload){
    
    return new Promise((resolve, reject) => {
    const sql = "declare @variabel INT set @variabel = (SELECT [eksamen].[user_interest].user_id  FROM [eksamen].[user] INNER JOIN [eksamen].[user_interest] ON [eksamen].[user].id = [eksamen].[user_interest].user_id WHERE [eksamen].[user].username = @username and [eksamen].[user].password = @password) if @variabel is null SELECT * FROM [eksamen].[user] WHERE username = @username and password = @password else SELECT *  FROM [eksamen].[user] INNER JOIN [eksamen].[user_interest] ON [eksamen].[user].id = [eksamen].[user_interest].user_id WHERE [eksamen].[user].username = @username and [eksamen].[user].password = @password"

            const request = new Request(sql, (err, rowcount) => {
                if (err){
                    reject(err)
                    console.log(err)
                
                }
                console.log(rowcount)
                if ( rowcount == 1 ){
                    reject(err)
                    console.log(err)
                }
                
            });
            
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            console.log(columns)
            //Med resolve() returneres promise.
            resolve(columns)
        });

    connection.execSql(request)


    });
}
module.exports.insertlogin = insertlogin;


//Logge ind
function adminlogin(payload){
    
    return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM [eksamen].[admin] WHERE username = @username and password = @password"; 
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
        
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            //Med resolve() returneres promise.
            resolve(columns)
        });

    connection.execSql(request)


    });
}
module.exports.adminlogin = adminlogin;



//Delete user
function deleteStatement(id1){
    return new Promise((resolve, reject) => {
    const sql = "BEGIN DECLARE @Counter INT , @MaxId INT SELECT @Counter = min([eksamen].[match].id) , @MaxId = max([eksamen].[match].id) FROM [eksamen].[match] WHILE(@Counter IS NOT NULL AND @Counter <= @MaxId) BEGIN IF (SELECT [eksamen].[match].user_id_1 FROM [eksamen].[match] WHERE [eksamen].[match].id = @Counter ) = @id OR (SELECT [eksamen].[match].user_id_2 FROM [eksamen].[match] WHERE [eksamen].[match].id = @Counter ) = @id BEGIN DELETE FROM [eksamen].[match] WHERE [eksamen].[match].id = @Counter END SET @Counter = @Counter + 1 END DELETE FROM [eksamen].[user] WHERE [eksamen].[user].id = @id END"; 
        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }}); 
                request.addParameter('id', TYPES.Int, id1)   

                //request.on, til at der skal ske, når requestet er eksekveret. 
                //Row sørger for der kan returneres en række til frontend.  
                request.on('row', (columns) => {
                //Med resolve() returneres promise.
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
        
    const sql = "UPDATE eksamen.[user] SET username = @updateusername, password = @updatepassword, firstname = @updatefirstname, lastname = @updatelastname, birthdate = @updatebirthdate, gender = @updategender, lookingfor = @lookingfor, agerange = @agerange, region = @region WHERE id = @id "
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
            
            //request.on, til at der skal ske, når requestet er eksekveret. 
            //RequestCompleted, til at fortælle request er slut. 
            request.on('requestCompleted', (row) => {
                //Med resolve() returneres promise.
                resolve('User updated', row)
            });
    connection.execSql(request)


    });
}
module.exports.updateStatement = updateStatement;




var array = []
//Bruges til get swipe. 
function swipe(lookingfor){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [eksamen].[user] INNER JOIN [eksamen].[user_interest] ON [eksamen].[user].id = [eksamen].[user_interest].user_id where gender = @lookingfor'
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

        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', function(columns) {
            array.push(columns)   
        }); 
        /*request.on('done', (rowCount) => {
            console.log('Done is called!');
          });*/
          //DoneInProc til at returnere alle linjer. Returnerer først promise når alle linjer er klar til at blive sendt til frontend. 
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
            //Sender alle rækkerne med resolve()
            resolve(array)
            array = []
          });
        connection.execSql(request)    
        })
    
}
module.exports.swipe = swipe;






//Interests
function insertInterest(payload){
    return new Promise((resolve, reject) => {
    const sql = `DELETE FROM [eksamen].[user_interest] where user_id = @user_id INSERT INTO [eksamen].[user_interest] (user_id, interest_id)  VALUES (@user_id, @interest_id)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('user_id', TYPES.Int, payload.user_id)
        request.addParameter('interest_id', TYPES.Int, payload.interest_id)
    
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //RequestCompleted, til at fortælle request er slut. 
        request.on('requestCompleted', (row) => {
            console.log('Interests succeded', row)
            //Med resolve() returneres promise.
            resolve('Interests inserted', row)
        });

    connection.execSql(request)
    });
}
module.exports.insertInterest = insertInterest
;

function votefunction(payload){
    
    return new Promise((resolve, reject) => {
    //const sql = "INSERT INTO [eksamen].[votes] (user_id, target_user_id, vote) VALUES (@user_id, @target_user_id, @vote)" 
    const sql = "DECLARE @Counter INT , @MaxId INT, @variable INT, @yesorno NVARCHAR(100) SELECT @Counter = min([eksamen].[votes].id) , @MaxId = max([eksamen].[votes].id) FROM [eksamen].[votes] SET @yesorno = 'post' WHILE (@Counter IS NOT NULL AND @Counter <= @MaxId) BEGIN IF @user_id = (SELECT [eksamen].[votes].user_id from [eksamen].[votes] WHERE id = @Counter) AND @target_user_id = (SELECT [eksamen].[votes].target_user_id from [eksamen].[votes] WHERE id = @Counter) BEGIN SET @yesorno = 'no post' BREAK END SET @Counter  = @Counter  + 1; END IF @yesorno = 'post' INSERT INTO [eksamen].[votes] (user_id, target_user_id, vote) VALUES (@user_id, @target_user_id, @vote) else print 'der blev ikke postet'"
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
        
        //RequestCompleted, til at fortælle request er slut. 
        request.on('requestCompleted', (row) => {
            (console.log(row))
            //Med resolve() returneres promise.
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
                }
            });
        request.addParameter('loggedIn', TYPES.Int, payload.loggedInId)
        
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', function(columns) {
            array1.push(columns)
        }); 
        /*request.on('done', (rowCount) => {
            console.log('Done is called!');
          });*/
          //DoneInProc til at returnere alle linjer. Returnerer først promise når alle linjer er klar til at blive sendt til frontend. 
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
            //Med resolve() sendes alle rækker til frontend. 
            resolve(array1)
            array1 = []
          });
    connection.execSql(request)
    });
}
module.exports.posiblematch = posiblematch;


function matchfunction(payload){

    return new Promise((resolve, reject) => {
       
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
        
        
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            //Med resolve() returneres promise.
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

        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', function(columns) {
            array2.push(columns)
        }); 
        
        //DoneInProc til at returnere alle linjer. Returnerer først promise når alle linjer er klar til at blive sendt til frontend. 
          request.on('doneInProc', (rowCount, more) => {
            console.log(rowCount + ' rows returned');
        //Med resolve() sendes alle rækker til frontend. 
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
                
                //request.on, til at der skal ske, når requestet er eksekveret. 
                //Row sørger for der kan returneres en række til frontend. 
                request.on('row', (columns) => {
                //Med resolve() returneres promise.
                resolve(columns)
            });
    connection.execSql(request)


    });
}
module.exports.deleteMatchStatement = deleteMatchStatement;

//Delete likes - chris hvad fuck er det her din søde mand
function deleteLikesStatement(payload){
    return new Promise((resolve, reject) => {
    const sql = "DELETE From eksamen.votes WHERE (user_id = @user_id and target_user_id = @target_user_id) OR (target_user_id = @user_id AND user_id = @target_user_id)"


        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }}); 
                request.addParameter('user_id', TYPES.Int, payload.user_id)
                request.addParameter('target_user_id', TYPES.Int, payload.target_user_id)  

                //request.on, til at der skal ske, når requestet er eksekveret. 
                //Row sørger for der kan returneres en række til frontend. 
                request.on('row', (columns) => {
                //Med resolve() returneres promise.
                resolve(columns)
            });
    connection.execSql(request)


    });
}
module.exports.deleteLikesStatement = deleteLikesStatement;


//Bruges til usercount. 
function selectusercount(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT ([eksamen].[user].id) FROM [eksamen].[user]'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'No users in database'})
            }
        });

        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            //Med resolve() returneres promise.
            resolve(columns)
        });

        connection.execSql(request)    
        })
    

}
module.exports.selectusercount = selectusercount;

//bruges til matchcount
function selectmatchcount(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT ([eksamen].[match].id) FROM [eksamen].[match]'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'No users in database'})
            }
        });
        
        //request.on, til at der skal ske, når requestet er eksekveret. 
        //Row sørger for der kan returneres en række til frontend. 
        request.on('row', (columns) => {
            //Med resolve() returneres promise.
            resolve(columns)
        });

        connection.execSql(request)    
        })
    

}
module.exports.selectmatchcount = selectmatchcount;