
const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    switch (req.method) {
        case 'UPDATE':
            await update(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}


function update(payload){
    
    return new Promise((resolve, reject) => {
    const sql = "UPDATE * FROM [eksamen].[user], (username, password, firstname, lastname, birthdate, gender) VALUES (@username, @password, @firstname, @lastname, @birthdate, @gender)"; 
        const request = new Request(sql, (err) => {
            if(err){
                reject({message: "error connection"})    
            }});

        request.addParameter('username', TYPES.VarChar, payload.username)
        
        request.on('row', (row) => {
            console.log('User inserted', row)
            resolve('User inserted', row) 
        });

    connection.execSql(request)

    });
}
module.exports.update = update;