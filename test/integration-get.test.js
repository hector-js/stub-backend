'use strict';

var app = require('../lib/app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - stub backend project', () => {
    describe('without Authentication', () => {
        it('returns a valid reponse for Nathan id', (done) => {
            request(app)
                .get('/stories/nathan/person')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.equal({
                        "name": "Nathan"
                    });
                    done();
                });
        });

        it('returns a valid reponse for Mark id', (done) => {
            request(app)
                .get('/stories/mark/person')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.equal({
                        "name": "Mark"
                    });
                    done();
                });
        });

        it('returns 404 when is not finding the scenario', (done) => {
            request(app)
                .get('/stories/nathan/age')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.deep.equal({
                        errorCode: 404,
                        message: 'Scenario not found in db.json! :('
                    });
                    done();
                });
        });

        it('returns 404 when it exists an status in the json file which says 404', (done) => {
            request(app)
                .get('/stories/smith/confidential')
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.deep.equal({
                        messageError: 'request not found'
                    });
                    done();
                });
        });

        describe('get all resources',()=>{
            it('returns a response when there is no id',(done)=>{
                request(app)
                .get('/stories/people')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.equal({"people":[{"name": "Nathan"},{"name": "Mark"}]});
                    done();
                });
            });
            
            it('returns a response when there is id empty',(done)=>{
                request(app)
                .get('/stories/budgets')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.equal({"people":[{"budget": "1000"},{"budget": "5000"}]});
                    done();
                });
            });
        });
    });

    describe('with Authentication', () => {
        it('returns a valid reponse', (done) => {
            request(app)
                .get('/stories/Nathan/budget')
                .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE', id: 'MY_ID' })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.deep.equal({
                        "name": "Nathan"
                    });
                    done();
                });
        });

        it('returns 404 when it is not finding the scenario', (done) => {
            request(app)
                .get('/stories/Nathan/age')
                .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE' })
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.deep.equal({
                        errorCode: 404,
                        message: 'Scenario not found in db.json! :('
                    });
                    done();
                });
        });

        describe('headers', () => {
            it('returns 401 when it authorization header is not there and the request requires authentication', (done) => {
                request(app)
                    .get('/stories/nathan/budget')
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(res.body).to.deep.equal({
                            errorCode: 401,
                            message: 'Header not found! :('
                        });
                        done();
                    });
            });

            it('returns 401 when it id header is not there and the request requires the header', (done) => {
                request(app)
                    .get('/stories/smith/budget')
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(res.body).to.deep.equal({
                            errorCode: 401,
                            message: 'Header not found! :('
                        });
                        done();
                    });
            });
        });

        describe('cookies', () => {
            it('should return a valid response when a cookie is in the request', (done) => {
                request(app)
                    .get('/stories/christopher/confidential')
                    .set('Cookie', ['session-id=12345667', 'key-id=KEY_ENCRYPTED'])
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "gender": "male",
                            "dob": "12/12/1990"
                        });
                        done();
                    });
            });

            it('should return 401 when a cookie is not presented in the request', (done) => {
                request(app)
                    .get('/stories/christopher/confidential')
                    .set('Cookie', ['session-id=12345667'])
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(res.body).to.deep.equal({
                            errorCode: 401,
                            message: 'Cookie not found in the request! :('
                        });
                        done();
                    });
            });
        });

        describe('cookies&headers', () => {
            it('should return 401 when a cookie and header are not presented in the request with specific message', (done) => {
                request(app)
                    .get('/stories/mark/confidential')
                    .set('Cookie', ['session-id=12345667'])
                    .end((err, res) => {
                        expect(res.status).to.equal(401);
                        expect(res.body).to.deep.equal({
                            errorCode: 401,
                            message: 'Cookie and header not found in the request! :('
                        });
                        done();
                    });
            });
        });
    });
});



