import { getHeaders, arrayToJson, buildUrl, getStatus } from "../../utils.cli";

export const traceTestTemplate = (args, idsFormatted) => {
  let path = args._[2];
  const pathWithDummyData = buildUrl(path, idsFormatted);
  const headers = getHeaders(args);
  const status = getStatus(args);
  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('TRACE - ${path} ', () => {
  it('should exist', (done) => {
    request(app)
      .trace('${path.startsWith('/') ? pathWithDummyData : `/${pathWithDummyData}`}')
      ${headers ? `.set({${arrayToJson(headers)}})` : ''}
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(${status ? status : '200'});
          expect(res.body).to.be.empty;
          done();
      });
  });
});
`;
}
