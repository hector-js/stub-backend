'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- retry', () => {
  describe('different responses for the same request', () => {
    it('returns SP for the first request', (done) => {
      request(app)
          .get('/customers/A123/country/B123')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              code: 'SP'
            });
            done();
          });
    });

    it('returns GB for the first request', (done) => {
      request(app)
          .get('/customers/A123/country/B123')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              code: 'GB'
            });
            done();
          });
    });

    it('returns NG for the first request', (done) => {
      request(app)
          .get('/customers/A123/country/B123')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              code: 'NG'
            });
            done();
          });
    });
  });
});
