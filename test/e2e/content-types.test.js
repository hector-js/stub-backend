'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- content-type', () => {
  describe('x-www-form-urlencoded as request', () => {
    it('returns a matched scenario', (done) => {
      request(app)
          .post('/health/status')
          .send('name=Mateo')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'status': 'healthier'
            });
            done();
          });
    });
  });

  describe('form-data as request', () => {
    it('returns a matched scenario', (done) => {
      request(app)
          .post('/health/status')
          .type('form')
          .field('name', 'Super Mateo')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'status': 'Super healthier'
            });
            done();
          });
    });
  });
});
