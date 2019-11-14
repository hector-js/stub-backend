'use strict';

const app = require('../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('POST - stub backend project', () => {
  describe('without Authentication', () => {
    it('returns a valid reponse for specific body', (done) => {
      request(app)
          .post('/story/nathan')
          .set('Accept', 'application/json')
          .send({'name': 'Nathan'})
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'custom': 'response',
            });
            done();
          });
    });
  });
});
