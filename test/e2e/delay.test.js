'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('delay', () => {
  context('when there is a delay of 5 seconds', () => {
    it('returns a response after 5 seconds', (done) => {
      request(app)
          .get('/delay/1/seconds')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              ok: 'you got a response after 10 seconds'
            });
            done();
          });
    }).timeout(6000);
  });

  context('when there is no delay', () => {
    it('returns a valid reponse immediatly', (done) => {
      request(app)
          .get('/delay/2/seconds')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              ok: 'you got a response immediatly'
            });
            done();
          });
    });
  });
});
