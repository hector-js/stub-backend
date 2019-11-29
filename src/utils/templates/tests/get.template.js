import { getHeaders, arrayToJson, buildUrl, getStatus } from "../../utils.cli";

export const getTestTemplate = (args, idsFormatted) => {
  const path = args._[2];
  const pathWithDummyData = buildUrl(path, idsFormatted);
  const headers = getHeaders(args);
  const status = getStatus(args);
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
          expect(err).to.not.exist;
          expect(res.status).to.equal(${status ? status : '200'});
          expect(res.body).to.deep.equal({
            "body" : "To be defined"
          });
          done();
      });
  });
});
`;
}
