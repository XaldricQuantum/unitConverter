const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
// const { expect } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert.', function(done) {
        chai.request(server).get("/api/convert?input=10L")
                            .end((err, res) => {
                                assert.equal(res.status, 200, "Response status should be 200");
                                assert.isObject(res.body, "Response should be an objest");
                                assert.equal(res.body.string, "10 liters converts to 2.64172 gallons", "String should be match expected value");
                                done();
                            });
    });
    test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
        chai.request(server)
            .get("/api/convert?input=32g")
            .end((err, res) => {
                assert.equal(res.status, 500);
                assert.equal(res.body, "invalid unit");
            });
    });
});
