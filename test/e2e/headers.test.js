'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- Headers response', () => {
  describe('headers', () => {
    context('when headers section exists with just key', () => {
      it('returns a response with the header', (done) => {
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

      context('when headers section exists with key value', () => {
        it('returns a response with the header', (done) => {
          request(app)
              .get('/headers/2/key')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.get('header-res-1')).to.equal('custom-value-1');
                expect(res.get('header-res-2')).to.equal('custom-value-2');
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  ok: 'you got a response with key and values headers'
                });
                done();
              });
        });
      });
    });

    describe('cookies', () => {
      context('when cookies section exists with just key', () => {
        it('returns a response with the cookie', (done) => {
          request(app)
              .get('/cookies/1/key')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.headers['set-cookie']).to.exist;
                expect(res.headers['set-cookie'].length).to.equal(2);
                expect(res.headers['set-cookie'][0]).to.equal('cookie-res-1=cookie-res-1-value; Path=/');
                expect(res.headers['set-cookie'][1]).to.equal('cookie-res-2=cookie-res-2-value; Path=/');
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  ok: 'you got a response with just key cookie'
                });
                done();
              });
        });

        context('when cookies section exists with key value', () => {
          it('returns a response with the cookie', (done) => {
            request(app)
                .get('/cookies/2/key')
                .end((err, res) => {
                  expect(err).to.not.exist;
                  expect(res.headers['set-cookie']).to.exist;
                  expect(res.headers['set-cookie'].length).to.equal(2);
                  expect(res.headers['set-cookie'][0]).to.equal('cookie-res-1=custom-value-1; Path=/');
                  expect(res.headers['set-cookie'][1]).to.equal('cookie-res-2=custom-value-2; Path=/');
                  expect(res.status).to.equal(200);
                  expect(res.body).to.deep.equal({
                    ok: 'you got a response with key and values cookies'
                  });
                  done();
                });
          });
        });
      });
    });
  });
});
