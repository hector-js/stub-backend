'use strict';

var ContextMatcher = require('./../lib/app/shared/context-matcher');
var chai = require('chai');

var expect = chai.expect;

describe('context matcher', () => {
    it('validates the pattern of the context path', () => {
        const contextPath = 'user/identifier/bla';
        const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/blu', 'use/(.*?)/bla']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.true;
        expect(result.contextPath).to.deep.equal('user/(.*?)/bla');
        expect(result.id).to.equal('identifier');
    });

    it('validates the pattern of the context path when 2 matches', () => {
        const contextPath = 'user/identifier/bla';
        const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/bl', 'use/(.*?)/bla']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.true;
        expect(result.contextPath).to.be.equal('user/(.*?)/bla');
        expect(result.id).to.equal('identifier');
    });

    it('validates the pattern of the context path when both regex are valid for that context path', () => {
        const contextPath = '/stories/budgets';
        const arrayRegex = ['/stories/budgets','/stories']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.true;
        expect(result.contextPath).to.deep.equal('/stories/budgets');
        expect(result.id).to.be.undefined;
    });

    it('sanitize regex when there are more than one valid', () => {
        const contextPath = '/stories/nathan/person';
        const arrayRegex = ['/stories/(.*?)/person', '/stories']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.true;
        expect(result.contextPath).to.deep.equal('/stories/(.*?)/person');
        expect(result.id).to.equal('nathan');
    });

    it('sanitize regex when there are more than one valid', () => {
        const contextPath = '/stories/nathan/age';
        const arrayRegex = ['^/stories/(.*?)/person$', '^/stories$']

        const result = ContextMatcher.getIdByContextPath(contextPath, arrayRegex);

        expect(result.hasResult).to.be.false;
        expect(result.contextPath).to.be.null;
        expect(result.id).to.be.null;
    });
});