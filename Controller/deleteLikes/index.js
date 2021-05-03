const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    switch (req.method) {
        case 'DELETE':
            await deleteLikes(context, req);
            break; 
        default:
            context.res = {
                body: "Please delete"
            };
            break
    }
}

async function deleteLikes(context, req){
    try{
        let payload = req.body;
        let response = await db.deleteLikesStatement(payload)
        console.log(response);
        context.res = {
            body: {status: 'Success'}
        }
    }
    catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}


