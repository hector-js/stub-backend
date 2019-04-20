'use strict';

var ContextMatcher = require('./../stub-backend/app/utils/context-matcher');
var chai = require('chai');

var expect = chai.expect;

describe('context matcher', () => {
    it('validates the patten of the context path', () => {
        const contextPath = 'user/identifier/bla';
        const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/blu', 'use/(.*?)/bla']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.true;
        expect(result.contextPath).to.deep.equal('user/(.*?)/bla');
        expect(result.id).to.equal('identifier');
    });

    it('validates the patten of the context path when 2 matches', () => {
        const contextPath = 'user/identifier/bla';
        const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/bl', 'use/(.*?)/bla']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.false;
        expect(result.contextPath).to.be.null;
        expect(result.id).to.be.null;
    });
});