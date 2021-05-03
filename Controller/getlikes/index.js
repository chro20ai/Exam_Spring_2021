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
            await checkmatch(context, req);
            break; 
        default:
            context.res = {
                body: "Please post"
            };
            break
    }
}

async function checkmatch(context, req){
    try{
        let payload = req.body;
        var user = await db.posiblematch(payload)
        context.res = {
            body: user
        }
    }
    catch(error){
        context.res = {
            status: 400,
            body: error.message
        }
    }
}