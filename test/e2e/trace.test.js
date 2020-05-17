'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- TRACE - stub backend project', () => {
  it('returns a 200 status', (done) => {
    request(app)
        .trace('/story/nathan')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
        });
  });
});
