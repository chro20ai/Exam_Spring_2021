const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    //Hvis method fra Fetch er GET eller POST startes funktion i case. 
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get(context, req){
    try{
        //modtager username fra fetch i frontend. 
        let username = req.query.username;
        //Kør select i db fil
        let user = await db.select(username)
        context.res = {
            body: user
        };
    }
    catch(error){
        context.res = {
            //Fejl
            status: 400,
            body: `No user - ${error.message}`
        }
    }

}

async function post(context, req){
    try{
        //Payload er body, som indeholder de informationer om bruger der skal postes til databasen. 
        let payload = req.body;
        //Starter insert funktion i db fil. 
        await db.insert(payload)
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