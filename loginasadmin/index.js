const db = require('../shared/db');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        await db.startDb(); //Start db connection
        }       catch (error) {
            console.log("Error connecting to the database", error.message) 
        }
    switch (req.method) {
        case 'POST':
            await postadmin(context, req);
            break; 
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function postadmin(context, req){
    try{
        let payload = req.body;
        let response = await db.adminlogin(payload)
        //Her skal valideres. Hvis der kommer en bruger er man logget ind. 
        console.log(response);
        context.res = {
            body: response
        }
    }
    catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}