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
            await vote(context, req);
            break; 
        default:
            context.res = {
                body: "Please post"
            };
            break
    }
}

async function vote(context, req){
    try{
        let payload = req.body;
        await db.votefunction(payload)
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