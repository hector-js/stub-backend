'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('HEAD - stub backend project', () => {
  describe('without Authentication', () => {
    it('returns a valid reponse for Nathan id', (done) => {
      request(app)
          .head('/stories/nathan/person')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
    });

    it('returns a valid reponse for Mark id', (done) => {
      request(app)
          .head('/stories/mark/person')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
    });

    it('returns 404 when is not finding the scenario', (done) => {
      request(app)
          .head('/stories/nathan/age')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.be.empty;
            done();
          });
    });

    it('returns 404 when it exists an status in the json file', (done) => {
      request(app)
          .head('/stories/smith/confidential')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.be.empty;
            done();
          });
    });

    describe('get all resources', () => {
      it('returns a response when there is no id', (done) => {
        request(app)
            .head('/stories/people')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.empty;
              done();
            });
      });

      it('returns a response when there is id empty', (done) => {
        request(app)
            .head('/stories/budgets')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.empty;
              done();
            });
      });

      it('returns a response when the path contains just one word', (done) => {
        request(app)
            .head('/stories')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.be.empty;
              done();
            });
      });
    });
  });

  describe('with Authentication', () => {
    it('returns a valid reponse', (done) => {
      request(app)
          .head('/stories/Nathan/budget')
          .set({Authorization: 'PLACE_YOUR_TOKEN_HERE', id: 'MY_ID'})
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.empty;
            done();
          });
    });

    it('returns 404 when it is not finding the scenario', (done) => {
      request(app)
          .head('/stories/Nathan/age')
          .set({Authorization: 'PLACE_YOUR_TOKEN_HERE'})
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            done();
          });
    });

    describe('headers', () => {
      context('when authorization header is not in the request', () => {
        it('returns 401', (done) => {
          request(app)
              .head('/stories/nathan/budget')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.be.empty;
                done();
              });
        });
      });

      context('when id header is not in the request', () => {
        it('returns 401', (done) => {
          request(app)
              .head('/stories/smith/budget')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.be.empty;
                done();
              });
        });
      });
    });

    describe('cookies', () => {
      context('when a cookie is in the request', () => {
        it('should return a valid response', (done) => {
          request(app)
              .head('/stories/christopher/confidential')
              .set('Cookie', ['session-id=12345667', 'key-id=KEY_ENCRYPTED'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.be.empty;
                done();
              });
        });
      });

      context('when a cookie is not presented in the request', () => {
        it('should return 401', (done) => {
          request(app)
              .head('/stories/christopher/confidential')
              .set('Cookie', ['session-id=12345667'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.be.empty;
                done();
              });
        });
      });
    });

    describe('cookies&headers', () => {
      context('when a cookie and header are not presented', () => {
        it('should return 401', (done) => {
          request(app)
              .head('/stories/mark/confidential')
              .set('Cookie', ['session-id=12345667'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.be.empty;
                done();
              });
        });
      });
    });
  });
});
