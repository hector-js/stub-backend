'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E - wildcard', () => {
  describe('two parameters in the request', () => {
    it('returns 1 scenario when first id match and second id is a wildcard', (done) => {
      request(app)
          .get('/wildcard/1/3/whatever')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              scenario: '2'
            });
            done();
          });
    });

    it('returns multiple scenarios response when a wildcard scenario match with another scenario', (done) => {
      request(app)
          .get('/wildcard/1/2/whatever')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({
              errorCode: 500,
              message: 'Multiple scenarios were found :('
            });
            done();
          });
    });
  });
});

