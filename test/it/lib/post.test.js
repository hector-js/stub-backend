'use strict';

const app = require('../../../lib/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('POST - stub backend project', () => {
  describe('without Authentication', () => {
    context('when the url doesnt contain any id', () => {
      it('returns a valid reponse', (done) => {
        request(app)
          .post('/story/nathan')
          .set('Accept', 'application/json')
          .send({ 'name': 'Nathan' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'custom': 'response',
            });
            done();
          });
      });
    });

    context('when the url contain an id and param', () => {
      it('returns a valid reponse', (done) => {
        request(app)
          .post('/customers/1234/session?scenario=aaa')
          .set('Accept', 'application/json')
          .send({ 'custom': 'any data' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'response': 'any',
            });
            done();
          });
      });

      it('returns a not found response when param does not exist', (done) => {
        request(app)
          .post('/customers/1234/session?scenario=aa')
          .set('Accept', 'application/json')
          .send({ 'custom': 'any data' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({
              errorCode: 404,
              message: 'Scenario not found in the resources! :(',
            });
            done();
          });
      });
    });

    context('when the scenario does not have to match with the body request', () => {
      it('response with the scenario which does not have any request', (done) => {
        request(app)
          .post('/customers/1234/session?scenario=aaa')
          .set('Accept', 'application/json')
          .send({ 'custom': 'any data 2' })
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({
              'data': 'response without request checked',
            });
            done();
          });
      });
    });
  });

  describe('with Authentication', () => {
    it('returns a valid reponse', (done) => {
      request(app)
        .post('/stories/Nathan/authentication')
        .set('Accept', 'application/json')
        .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE', 'client-ID': 'MY_ID' })
        .send({ 'name': 'hectorjs' })
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'response': 'any',
          });
          done();
        });
    });
  });
});
