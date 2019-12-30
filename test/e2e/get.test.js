'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('GET - stub backend project', () => {
  describe('without Authentication', () => {
    it('returns a valid reponse for Nathan id', (done) => {
      request(app)
          .get('/stories/nathan/person')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'name': 'Nathan'
            });
            done();
          });
    });

    it('returns a valid reponse for Mark id', (done) => {
      request(app)
          .get('/stories/mark/person')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'name': 'Mark'
            });
            done();
          });
    });

    it('returns 404 when is not finding the scenario', (done) => {
      request(app)
          .get('/stories/nathan/age')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              errorCode: 404,
              message: 'Scenario not found in the resources! :('
            });
            done();
          });
    });

    it('returns 404 when it exists an status in the json file', (done) => {
      request(app)
          .get('/stories/smith/confidential')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              messageError: 'request not found'
            });
            done();
          });
    });

    describe('get all resources', () => {
      it('returns a response when there is no id', (done) => {
        const response = { 'people': [{ 'name': 'Nathan' }, { 'name': 'Mark' }] };
        request(app)
            .get('/stories/people')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal(response);
              done();
            });
      });

      it('returns a response when there is id empty', (done) => {
        const bodyResp = { 'people': [{ 'budget': '1000' }, { 'budget': '5000' }] };
        request(app)
            .get('/stories/budgets')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal(bodyResp);
              done();
            });
      });

      it('returns a response when the path contains just one word', (done) => {
        const bodyResp = { 'people': [{ 'budget': '15000' }, { 'budget': '5000' }] };
        request(app)
            .get('/stories')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal(bodyResp);
              done();
            });
      });
    });
  });

  describe('with Authentication', () => {
    it('returns a valid reponse', (done) => {
      request(app)
          .get('/stories/Nathan/budget')
          .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE', id: 'MY_ID' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'name': 'Nathan'
            });
            done();
          });
    });

    it('returns 404 when it is not finding the scenario', (done) => {
      request(app)
          .get('/stories/Nathan/age')
          .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              errorCode: 404,
              message: 'Scenario not found in the resources! :('
            });
            done();
          });
    });

    describe('headers', () => {
      context('when authorization header is not in the request', () => {
        it('returns 401', (done) => {
          request(app)
              .get('/stories/nathan/budget')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.deep.equal({
                  errorCode: 401,
                  message: 'Header not found! :('
                });
                done();
              });
        });
      });

      context('when id header is not in the request', () => {
        it('returns 401', (done) => {
          request(app)
              .get('/stories/smith/budget')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.deep.equal({
                  errorCode: 401,
                  message: 'Header not found! :('
                });
                done();
              });
        });
      });
    });

    describe('cookies', () => {
      context('when a cookie is in the request', () => {
        it('should return a valid response', (done) => {
          request(app)
              .get('/stories/christopher/confidential')
              .set('Cookie', ['session-id=12345667', 'key-id=KEY_ENCRYPTED'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  'gender': 'male',
                  'dob': '12/12/1990'
                });
                done();
              });
        });
      });

      context('when a cookie is not presented in the request', () => {
        it('should return 401', (done) => {
          request(app)
              .get('/stories/christopher/confidential')
              .set('Cookie', ['session-id=12345667'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.deep.equal({
                  errorCode: 401,
                  message: 'Cookie not found in the request! :('
                });
                done();
              });
        });
      });
    });

    describe('cookies&headers', () => {
      context('when a cookie and header are not presented', () => {
        it('should return 401', (done) => {
          request(app)
              .get('/stories/mark/confidential')
              .set('Cookie', ['session-id=12345667'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(401);
                expect(res.body).to.deep.equal({
                  errorCode: 401,
                  message: 'Cookie and header not found in the request! :('
                });
                done();
              });
        });
      });

      describe('check cookie by key and value', () => {
        it('should return a valid response', (done) => {
          request(app)
              .get('/customers/1234/person')
              .set('Cookie', ['session=4321', 'product=12'])
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  name: 'Thor'
                });
                done();
              });
        });
      });

      describe('check header by key and value', () => {
        it('should return a valid response', (done) => {
          request(app)
              .get('/customers/1234/pet')
              .set({ 'authorization': 'Beurer 1234', 'client_id': '1234' })
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  pet: 'dog'
                });
                done();
              });
        });
      });
    });
  });
});
