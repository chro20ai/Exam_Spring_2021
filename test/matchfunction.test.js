let chai = require('chai');
const httpFunction = require('../matchcounter/index.js');
const context = require('../testing/defaultContext')
let expect = chai.expect;

it('Match function should return known text', async () => {

const request = {}

    await httpFunction(context, request);

    expect(context.log.callCount).to.equal(2);
    expect(context.res.body).to.equal('Please get or post');
    
    
});