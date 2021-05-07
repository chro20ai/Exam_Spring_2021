const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    switch (req.method) {
        //Hvis method fra Fetch er DELETE startes funktion i case.
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
        //Modtager req.body.id fra fetch i frontend. 
        let id = req.body.id
        //deleteMatchStatement startes i db fil. 
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


