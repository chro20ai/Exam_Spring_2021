const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
        //Hvis method fra Fetch er DELETE startes funktion i case.
    switch (req.method) {
        case 'DELETE':
            await deleteUser(context, req);
            break; 
        default:
            context.res = {
                body: "Please delete"
            };
            break
    }
}

async function deleteUser(context, req){
    try{
        //Modtager req.body.id fra fetch i frontend. 
        let id1 = req.body.id
        //deleteStatement køres i db fil. 
        let response = await db.deleteStatement(id1)
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


