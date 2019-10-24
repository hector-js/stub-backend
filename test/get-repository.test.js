'use strict';

var GetRespository = require('./../lib/app/components/get/get.repository');
var chai = require('chai');

var expect = chai.expect;

describe('get repository', () => {
    it('returns the context path and id when it is found', () => {
        const contextPath = '/stories/nathan/person';
        
        const body = GetRespository.findData(contextPath);

        expect(body).to.deep.equal({
            id_: 'Nathan',
            headers_: [],
            description_: 'Get person details related to Nathan',
            body_: {
                name: 'Nathan'
            }
        });
    });

    it('returns context error message and id as null when it is not found', () => {
        const contextPath = '/stories/nathan/age';

        const body = GetRespository.findData(contextPath);

        expect(body).to.deep.equal({
            errorCode: 404,
            message: 'Scenario not found in db.json! :('
        });
    });
});