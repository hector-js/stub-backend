'use strict';

var server = require('../stub-backend/server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('stub backend project', () => {

    describe('without Authentication', () => {

        describe('#get', () => {

            it('a valid reponse', (done) => {
                request(server).get('/challenge/1').end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.name).to.equal('Federico')
                    done();
                });
            });

            it('Internal server error', (done) => {
                request(server).get('/challenge/2').end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.text).to.equal('Internal Server Error')
                    done();
                });
            });

            it('Service Unavailable', (done) => {
                request(server).get('/challenge/3').end((err, res) => {
                    expect(res.status).to.equal(503);
                    expect(res.text).to.equal('Service Unavailable')
                    done();
                });
            });

            it('Service Unavailable', (done) => {
                request(server).get('/challenge/3').end((err, res) => {
                    expect(res.status).to.equal(503);
                    expect(res.text).to.equal('Service Unavailable')
                    done();
                });
            });

        });

    });

    describe('with Authentication', () => {

        describe('#get', () => {

            it('Unauthorized', (done) => {
                request(server).get('/challenge/4').end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal('Unauthorized')
                    done();
                });
            });

            it('a valid reponse', (done) => {
                request(server)
                    .get('/challenge/4')
                    .set({ Authorization: "PLACE_YOUR_TOKEN_HERE" }).end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.name).to.equal('Maria')
                        done();
                    });
            });

            it('Internal server error', (done) => {
                request(server).get('/challenge/5')
                    .set({ Authorization: "PLACE_YOUR_TOKEN_HERE" }).end((err, res) => {
                        expect(res.status).to.equal(500);
                        expect(res.text).to.equal('Internal Server Error')
                        done();
                    });
            });

            it('Service Unavailable', (done) => {
                request(server).get('/challenge/6')
                    .set({ Authorization: "PLACE_YOUR_TOKEN_HERE" }).end((err, res) => {
                        expect(res.status).to.equal(503);
                        expect(res.text).to.equal('Service Unavailable')
                        done();
                    });
            });

        });

    });

});