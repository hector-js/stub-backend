'use strict';

const app = require('../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('@E2E- GET - stub backend project', () => {
  describe('without Authentication', () => {
    describe('valid scenarios', () => {
      describe('id', () => {
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
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  'name': 'Mark'
                });
                done();
              });
        });
      });
    });

    describe('negative scenarios', () => {
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

      context('when resource does not have any req for an enpoint', () => {
        it('should return the scenario with the body', (done) => {
          request(app)
              .get('/no/mark/req')
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

        it('should return the scenario when id exists', (done) => {
          request(app)
              .get('/no/lucas/req')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  try: 'two'
                });
                done();
              });
        });
      });

      context('when res is not set', () => {
        it('should returns scenario not found', (done) => {
          request(app)
              .get('/no/carl/no/req')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(500);
                expect(res.body).to.deep.equal({
                  errorCode: 500,
                  message: '_res is missed in some scenario :('
                });
                done();
              });
        });
      });

      context('when req is not set and req does not exist', () => {
        it('should throw an error', (done) => {
          request(app)
              .get('/no/req/and/id')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(500);
                expect(res.body).to.deep.equal({
                  errorCode: 500,
                  message: '_req is missed in some scenario :('
                });
                done();
              });
        });
      });

      context('when req is not set and req exists', () => {
        it('should throw an error', (done) => {
          request(app)
              .get('/no/req/and/id/good')
              .end((err, res) => {
                expect(err).to.not.exist;
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                  try: 'one'
                });
                done();
              });
        });
      });
    });

    describe('get all resources', () => {
      it('returns a response when there is no id', (done) => {
        request(app)
            .get('/stories/people')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal({
                people: [
                  { name: 'Nathan' },
                  { name: 'Mark' }
                ]
              });
              done();
            });
      });

      it('returns a response when there is id empty', (done) => {
        request(app)
            .get('/stories/budgets')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal({
                people: [
                  { budget: '1000' },
                  { budget: '5000' }
                ]
              });
              done();
            });
      });

      it('returns a response when the path contains just one word', (done) => {
        request(app)
            .get('/stories')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(200);
              expect(res.body).to.deep.equal({
                people: [
                  { budget: '15000' },
                  { budget: '5000' }
                ]
              });
              done();
            });
      });
    });
  });

  describe('with headers', () => {
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
  });

  describe('with cookies', () => {
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
      it('should return 404', (done) => {
        request(app)
            .get('/stories/christopher/confidential')
            .set('Cookie', ['session-id=12345667'])
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
    });
  });

  describe('cookies and headers', () => {
    context('when a cookie and header are not presented', () => {
      it('should return 404', (done) => {
        request(app)
            .get('/stories/mark/confidential')
            .set('Cookie', ['session-id=12345667'])
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
