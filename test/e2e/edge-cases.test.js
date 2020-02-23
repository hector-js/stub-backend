'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('edge cases', () => {

  describe('two scenarios with the difference of the headers', () => {
    it.only('returns a response 1', (done) => {
      request(app)
          .get('/edge-cases/1')
          .set({ Authorization: '1', id: '1' })
          .end((err, res) => {
            expect(err).to.not.exist;
            // expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'edge-cases': '1'
            });
            done();
          });
    });

    it.only('returns a reponse 2', (done) => {
      request(app)
          .get('/edge-cases/1')
          .set({ Authorization: '2', id: '2' })
          .end((err, res) => {
            expect(err).to.not.exist;
            // expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'edge-cases': '2'
            });
            done();
          });
    });
  });
});
