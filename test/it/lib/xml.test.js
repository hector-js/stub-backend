'use strict';

const app = require('../../../lib/app');
const chai = require('chai');
const request = require('supertest');


const expect = chai.expect;

describe('xml', () => {
  describe('DELETE', () => {
    it('returns a xml', (done) => {
      request(app)
          .delete('/xml')
          .set('Accept', 'text/xml; charset=utf-8')
          .type('application/xml')
          .send('<xml><data>Data</data></xml>')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
            expect(res.text).to.equal('<xml><book><title>data1</title></book></xml>');
            done();
          });
    });
  });

  describe('GET', () => {
    it('returns a xml', (done) => {
      request(app)
          .get('/xml')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
            expect(res.text).to.equal('<xml><book><title>The Lion King</title></book></xml>');
            done();
          });
    });
  });

  describe('PATCH', () => {
    it('returns a xml', (done) => {
      request(app)
          .patch('/xml')
          .set('Accept', 'application/xml')
          .type('application/xml')
          .send('<xml><data>Data</data></xml>')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
            expect(res.text).to.equal('<xml><book><title>Patch</title></book></xml>');
            done();
          });
    });
  });

  describe('POST', () => {
    it('returns a xml', (done) => {
      request(app)
          .post('/xml')
          .set('Accept', 'application/xml')
          .type('application/xml')
          .send('<xml><data>Data</data></xml>')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
            expect(res.text).to.equal('<xml><book><title>post</title></book></xml>');
            done();
          });
    });
  });

  describe('PUT', () => {
    it('returns a xml', (done) => {
      request(app)
          .put('/xml')
          .set('Accept', 'application/xml')
          .type('application/xml')
          .send('<xml><data>Data</data></xml>')
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.status).to.equal(200);
            expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
            expect(res.text).to.equal('<xml><book><title>put</title></book></xml>');
            done();
          });
    });
  });
});
