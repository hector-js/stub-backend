import { arrayToJson, getHeaders, buildUrl } from "../../utils.cli";

export const deleteTestTemplate = (args, idsFormatted) => {
  let path = args._[2];
  const pathWithDummyData = buildUrl(path, idsFormatted);

  let headers = getHeaders(args);

  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('DELETE - ${path} ', () => {
  it('should exist', (done) => {
    request(app)
      .delete('${path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData}')
      ${headers ? `.set({${arrayToJson(headers)}})` : ''}
      .send({'dummy': 'dummy'})
      .end((err, res) => {
          expect(err).to.not.exist;
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
