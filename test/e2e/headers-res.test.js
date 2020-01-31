'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('headers', () => {
  context('when there is header section with just keys', () => {
    it('returns a response the response with the header', (done) => {
      request(app)
          .get('/headers/1/key')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.get('header-res-1')).to.equal('header-res-1-value');
            expect(res.get('header-res-2')).to.equal('header-res-2-value');
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              ok: 'you got a response with just key headers'
            });
            done();
          });
    });
  });
});
