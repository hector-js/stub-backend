'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');
const fs = require('fs');

const expect = chai.expect;

describe('@E2E- retry', () => {
  after(() => {
    const dir = './test/e2e/resources/temp';
    if (fs.existsSync(dir)) {
      if (fs.existsSync(dir + '/temp.json')) {
        fs.unlinkSync(dir + '/temp.json');
      }
      fs.rmdirSync(dir);
    }
  });

  describe('different responses for the same request', () => {
    it('returns SP(first call), GB(second call) and NG(third call)', (done) => {
      request(app)
          .get('/customers/A123/country/B123')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              code: 'SP'
            });
            request(app)
                .get('/customers/A123/country/B123')
                .end((err, res) => {
                  expect(err).to.not.exist;
                  expect(res.status).to.equal(200);
                  expect(res.body).to.deep.equal({
                    code: 'GB'
                  });
                  request(app)
                      .get('/customers/A123/country/B123')
                      .end((err, res) => {
                        expect(err).to.not.exist;
                        expect(res.status).to.equal(201);
                        expect(res.get('header-res-1')).to.equal('header-res-1-value');
                        expect(res.headers['set-cookie'][0]).to.equal('cookie-res-1=cookie-res-1-value; Path=/');
                        expect(res.body).to.deep.equal({
                          code: 'NG'
                        });
                        done();
                      });
                });
          });
    }).timeout(4000);
  });
});
