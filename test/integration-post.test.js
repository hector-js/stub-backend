'use strict';

var app = require('../lib/app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('POST - stub backend project', () => {
  describe('without Authentication', () => {
    it('returns a valid reponse for specific body', (done) => {
      request(app)
        .post('/story/nathan')
        .set('Accept', 'application/json')
        .send({ 'name': 'Nathan' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            "custom": "response"
          });
          done();
        });
    });
  });
});



