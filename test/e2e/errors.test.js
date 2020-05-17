'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- GET - stub backend project', () => {
  describe('resource not well format', () => {
    context('when the json is not well formatted', ()=>{
      it('returns an invalid response ', (done) => {
        request(app)
            .get('/errors')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(400);
              expect(res.body).to.deep.equal({
                errorCode: 400,
                message: 'Incorrect db json format under resources :('
              });
              done();
            });
      });
    });
  });
});
