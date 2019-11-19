import { arrayToJson, getHeaders, buildUrl } from "../../utils.cli";

export const postTestTemplate = (path, args, idsFormatted) => {
  const pathWithDummyData = buildUrl(path, idsFormatted);

  let headers = getHeaders(args);

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
