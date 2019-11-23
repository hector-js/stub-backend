'use strict';

const app = require('../../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('UI', () => {
  describe('html', () => {
    it('returns a html for a "/"', (done) => {
      request(app)
          .get('/')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('returns a html for a ""', (done) => {
      request(app)
          .get('')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            done();
          });
    });
    it('returns an file ico when "/favicon.ico" is called', (done) => {
      request(app)
          .get('/favicon.ico')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            done();
          });
    });
  });
});
