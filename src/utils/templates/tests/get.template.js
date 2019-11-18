export const getTestTemplate = (path, headers, idsFormatted) => {
  const pathWithDummyData = buildUrl(path, idsFormatted);
  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - ${path} ', () => {
  it('should exist', (done) => {
    request(app)
      .get('${path.startsWith('/') ? pathWithDummyData : `/${pathWithDummyData}`}')
      ${headers ? `.set({${arrayToJson(headers)}})` : ''}
      .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            "body" : "To be defined"
          });
          done();
      });
  });
});
`;
}

const arrayToJson = (headers) => {
  var headersJson = ''
  headers.forEach(header => headersJson = headersJson + `${header}: "any value" ,`);
  return headersJson.slice(0, -1);
}

const buildUrl = (path, ids) => {
  if(ids){
    ids.forEach(id => path = path.replace(`{${id}}`, `${id}TBD`));
  }
  return path;
}