'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- UI', () => {
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

    context(' when "/favicon.ico" is called', () => {
      it('returns an ico file', (done) => {
        request(app)
            .get('/favicon.ico')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              done();
            });
      });
    });

    context(' when "/css/main.css" is called', () => {
      it('returns a css file', (done) => {
        request(app)
            .get('/_css/main.css')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              done();
            });
      });
    });

    context('when "/js/main.js" is called', () => {
      it('returns a main.js file', (done) => {
        request(app)
            .get('/_js/main.js')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              done();
            });
      });
    });

    context(' when "/assets/Icon.png" is called', () => {
      it('returns Icon.png', (done) => {
        request(app)
            .get('/_assets/Icon.png')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              done();
            });
      });
    });
  });
});
