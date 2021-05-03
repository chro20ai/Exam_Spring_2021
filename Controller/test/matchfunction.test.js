let chai = require('chai');
const db = require('../shared/db');
const {Connection, Request, TYPES} = require('tedious');
const httpFunction = require('../shared/db.js');
const context = require('../testing/defaultContext')
let expect = chai.expect;
const config = require('../shared/config.json')

var connection = new Connection(config);
/*
it('Match function should return known text', async () => {

const request = { query: { id: 5 }}

let id = req.query.id;
let user = await db.selectmatchcount(id)
    
    await httpFunction(context, request);
    //context.res.body = "hallo penis"
    expect(context.log.callCount).to.equal(1);
    //expect(context.res.body).to.equal('hallo penis');
    expect(context.res.body).to.equal(user);
    
    
});
*/
it('db.connection.connect should ...', async function(done) {
    /*var connection = new Connection(config);
    db.connection.startDb(function(err, result) {
        if(err){
            done(err);
            return;
        }*/
        try{
            await db.startDb(); //Start db connection
            }       catch (error) {
                console.log("Error connecting to the database", error.message) 
                done()
            }
            resolve()
        expect(result).to.equal("Connected");
        done();
    });

