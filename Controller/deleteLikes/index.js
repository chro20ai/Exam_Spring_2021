const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        //Hvis method fra Fetch er DELETE startes funktion i case.
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
        //Modtager req.body fra fetch frontend. 
        let payload = req.body;
        //deleteLikesStatement startes i db fil. 
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


