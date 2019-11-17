export const postTestTemplate = (endpoint, headers) => {
  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('POST - ${endpoint} ', () => {
  it('should exist', (done) => {
    request(app)
      .post('${endpoint.startsWith('/') ? endpoint : '/' + endpoint}')
      ${headers ? `.set({${arrayToJson(headers)}})` : ''}
      .send({'dummy': 'dummy'})
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'dummyResponse': 'dummyResponse'
          });
          done();
      });
  });
});
`;
}

const arrayToJson = (headers) => {
  var headersJson = ''
  headers.forEach(header => {
    headersJson = headersJson + `${header}: "any value" ,`
  });

  return headersJson.slice(0, -1);
}