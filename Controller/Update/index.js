const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
        //Hvis method fra Fetch er PUT startes funktion i case.
    switch (req.method) {
        case 'PUT':
            await updateUser(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function updateUser(context, req){
    try{
        //Modtager indholdet af req.body fra fetch i frontend. 
        let payload = req.body;
        //Kører updateStatement i db fil. 
        let response = await db.updateStatement(payload)
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


