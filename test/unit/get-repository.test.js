'use strict';

const GetRespository = require('../../lib/app/components/get/get.repository');
const chai = require('chai');

const expect = chai.expect;

describe('get repository', () => {
  it('returns the context path and id when it is found', () => {
    const contextPath = '/stories/nathan/person';
    const req = {
      url: contextPath,
      method: 'GET',
    };

    const body = GetRespository.findData(req);

    expect(body).to.deep.equal({
      _id: 'Nathan',
      _headers: [],
      _description: 'ANY DESCRIPTION',
      _body: {
        name: 'Nathan',
      },
    });
  });

  context('when it is not found', () => {
    it('returns context error message and id as null', () => {
      const contextPath = '/stories/nathan/age';
      const req = {
        url: contextPath,
        method: 'GET',
      };

      const body = GetRespository.findData(req);

      expect(body).to.deep.equal({
        errorCode: 404,
        message: 'Scenario not found in the resources! :(',
      });
    });
  });
});
