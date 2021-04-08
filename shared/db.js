const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config);


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

function insert(payload){
    return new Promise((resolve, reject) => {
    const sql = `INSERT INTO [GKO7].[User] (name, email, gender, birthdate, fabrik_id) VALUES (@name, @email, @gender, @birthdate, @fabrik_id)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('birthdate', TYPES.Date, payload.birthdate)
        request.addParameter('fabrik_id', TYPES.Int, payload.fabrikId )

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row)
            resolve('User inserted', row)
        });

    connection.execSql(request)
//yallah

    });
}
module.exports.insert = insert;

function select(name){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [GKO7].[User] where name = @name'
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            }
            else if (rowcount == 0){
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)

        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)    
        })
    
}
module.exports.select = select;