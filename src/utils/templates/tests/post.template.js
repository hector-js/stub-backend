export const postTestTemplate = (path, headers, idsFormatted) => {
  const pathWithDummyData = buildUrl(path, idsFormatted);

  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('POST - ${path} ', () => {
  it('should exist', (done) => {
    request(app)
      .post('${path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData}')
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

const buildUrl = (path, ids) => {
  if(ids){
    ids.forEach(id => path = path.replace(`{${id}}`, `${id}TBD`));
  }
  return path;
}