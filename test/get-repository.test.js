'use strict';

const GetRespository = require('./../lib/app/components/get/get.repository');
const chai = require('chai');

const expect = chai.expect;

describe('get repository', () => {
  it('returns the context path and id when it is found', () => {
    const contextPath = '/stories/nathan/person';

    const body = GetRespository.findData(contextPath);

    expect(body).to.deep.equal({
      _id: 'Nathan',
      _headers: [],
      description_: 'Get person details related to Nathan',
      _body: {
        name: 'Nathan',
      },
    });
  });

  context('when it is not found', () => {
    it('returns context error message and id as null', () => {
      const contextPath = '/stories/nathan/age';

      const body = GetRespository.findData(contextPath);

      expect(body).to.deep.equal({
        errorCode: 404,
        message: 'Scenario not found in the resources! :(',
      });
    });
  });
});
