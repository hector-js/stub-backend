'use strict';

var app = require('../lib/app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - stub backend project', () => {
    describe('resource not well format', () => {
        it('returns an invalid response when the json is not well formatted', (done) => {
            request(app)
                .get('/errors')
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.deep.equal({
                        errorCode: 400,
                        message: 'Incorrect db json format under resources :('
                    });
                    done();
                });
        });
    });
});

