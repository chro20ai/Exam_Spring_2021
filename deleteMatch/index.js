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
            await deleteMatch(context, req);
            break; 
        default:
            context.res = {
                body: "Please delete"
            };
            break
    }
}

async function deleteMatch(context, req){
    try{
        let id = req.body.id
        let response = await db.deleteMatchStatement(id)
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


