const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    switch (req.method) {
        case 'GET':
            await getusercount(context, req);
            break;
        
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function getusercount(context, req){
    try{
        let username = req.query.username;
        let user = await db.selectusercount(username)
        context.res = {
            body: user
        };
    }
    catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }

}