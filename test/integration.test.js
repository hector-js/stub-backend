'use strict';

var server = require('../lib/server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('stub backend project', () => {
    describe('without Authentication', () => {
        describe('#get', () => {
            it('returns a valid reponse for Nathan id', (done) => {
                request(server)
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
                request(server)
                    .get('/stories/mark/person')
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "name": "Mark"
                        });
                        done();
                    });
            });

            it('return 404 when is not finding the scenario', (done) => {
                request(server)
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

            it('return 404 when it exists an status in the json file which says 404', (done) => {
                request(server)
                    .get('/stories/smith/confidential')
                    .end((err, res) => {
                        expect(res.status).to.equal(404);
                        expect(res.body).to.deep.equal({
                            messageError: 'request not found'
                        });
                        done();
                    });
            });
        });
    });

    describe('with Authentication', () => {
        describe('#get', () => {
            it('returns a valid reponse', (done) => {
                request(server)
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
                request(server)
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

            describe('headers',()=>{
                it('returns 401 when it authorization header is not there and the request requires authentication', (done) => {
                    request(server)
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
                    request(server)
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

            describe('cookies',()=>{
                it('should return a valid response when a cookie is in the request',(done)=>{
                    request(server)
                    .get('/stories/christopher/confidential')
                    .set('Cookie', ['session-id=12345667','key-id=KEY_ENCRYPTED'])
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "gender": "male",
                            "dob": "12/12/1990"
                          });
                        done();
                    });
                });
    
                it('should return 401 when a cookie is not presented in the request',(done)=>{
                    request(server)
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

            describe('cookies&headers',()=>{
                it('should return 401 when a cookie and header are not presented in the request with specific message',(done)=>{
                    request(server)
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
});



