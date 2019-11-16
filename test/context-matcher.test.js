'use strict';

const ContextMatcher = require('./../lib/app/shared/context-matcher');
const chai = require('chai');

const expect = chai.expect;

describe('context matcher', () => {
  it('validates the pattern of the context path', () => {
    const path = 'user/identifier/bla';
    const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/blu', 'use/(.*?)/bla'];

    const result = ContextMatcher.getIdByPath(path, arrayRegex);

    expect(result.hasResult).to.be.true;
    expect(result.contextPath).to.deep.equal('user/(.*?)/bla');
    expect(result.id).to.equal('identifier');
  });

  it('validates the pattern of the context path when 2 matches', () => {
    const path = 'user/identifier/bla';
    const arrayRegex = ['user/(.*?)/bla', 'user/(.*?)/bl', 'use/(.*?)/bla'];

    const result = ContextMatcher.getIdByPath(path, arrayRegex);

    expect(result.hasResult).to.be.true;
    expect(result.contextPath).to.be.equal('user/(.*?)/bla');
    expect(result.id).to.equal('identifier');
  });

  context(' when both regex are valid for that context path', () => {
    it('validates the pattern of the context path', () => {
      const path = '/stories/budgets';
      const arrayRegex = ['/stories/budgets', '/stories'];

      const result = ContextMatcher.getIdByPath(path, arrayRegex);

      expect(result.hasResult).to.be.true;
      expect(result.contextPath).to.deep.equal('/stories/budgets');
      expect(result.id).to.be.undefined;
    });
  });

  it('sanitize regex when there are more than one valid', () => {
    const path = '/stories/nathan/person';
    const arrayRegex = ['/stories/(.*?)/person', '/stories'];

    const result = ContextMatcher.getIdByPath(path, arrayRegex);

    expect(result.hasResult).to.be.true;
    expect(result.contextPath).to.deep.equal('/stories/(.*?)/person');
    expect(result.id).to.equal('nathan');
  });

  it('sanitize regex when there are more than one valid', () => {
    const path = '/stories/nathan/age';
    const arrayRegex = ['^/stories/(.*?)/person$', '^/stories$'];

    const result = ContextMatcher.getIdByPath(path, arrayRegex);

    expect(result.hasResult).to.be.false;
    expect(result.contextPath).to.be.null;
    expect(result.id).to.be.null;
  });
});

describe.only('path matcher', () => {
  describe('#isInDB', () => {
    describe('path with one id', ()=>{
      it('should return endpoint selected if the path macths with the request url', () => {
        const request = '/customers/chris/identifier';

        const contextMatcher = new ContextMatcher(request, db).isInDB();

        expect(contextMatcher).to.equal('/customers/{id}/identifier');
      });

      context('when the path has one field different', ()=>{
        it('should return null if the path does not exist', () => {
          const request = '/customers/chris/age';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });

    describe('path with different ids', ()=>{
      context('when the path contain one id and two parameters', ()=>{
        it('should return the proper endpoint', ()=>{
          const request = '/customers/123/data?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.equal('/customers/{id}/data?name={d1}&dateOfBirth={d2}');
        });
      });
      context('when the path contain more parameters than the db has', ()=>{
        it('should return undefined', ()=>{
          const request = '/customers/123/friend?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.undefined;
        });
      });
    });

    describe('path without any id', ()=>{
      context('when the paths are the same', ()=>{
        it('should return the enpoint', () => {
          const request = '/customers/age';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.equal('/customers/age');
        });
      });
      context('when the paths are different', ()=>{
        it('should return null', () => {
          const request = '/custome/tall';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });
  });

  describe('#getScenario', ()=>{
    describe('one id', ()=>{
      it.only('should return the scenario given one specific id', ()=>{
        const request = '/customers/mark/identifier';
        const contextMatcher = new ContextMatcher(request, db);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenario(endpoint);

        expect(scenario).to.deep.equal({
          id_: 'mark',
          headers_: [],
          description_: 'Mark identifier',
          body_: {
            name: 'Mark',
          },
        });
      });
    });
  });
});

const db = {
  '/customers/{id}/identifier': [
    {
      _id: 'Nathan',
      headers_: [],
      description_: 'Nathan identifier',
      body_: {
        name: 'Nathan',
      },
    },
    {
      _id: 'mark',
      headers_: [],
      description_: 'Mark identifier',
      body_: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}': [
    {
      id_: 'Nathan',
      headers_: [],
      description_: 'Nathan customers data',
      body_: {
        name: 'Nathan',
      },
    },
    {
      id_: 'mark',
      headers_: [],
      description_: 'Mark customers data',
      body_: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}/data?name={d1}&dateOfBirth={d2}': [
    {
      headers_: [],
      description_: 'Nathan customers data',
      _id: '123',
      _d1: 'hector',
      _d2: '10-10-200',
      body_: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/age': [
    {
      headers_: [],
      description_: 'Nathan customers data',
      body_: {
        name: 'Nathan',
      },
    },
  ],
};
