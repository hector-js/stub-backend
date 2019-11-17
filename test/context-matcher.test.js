'use strict';

const ContextMatcher = require('./../lib/app/shared/context-matcher');
const chai = require('chai');

const expect = chai.expect;

describe('path matcher', () => {
  describe('#isInDB', () => {
    describe('path with one id', () => {
      it('should return endpoint selected if the path macths with the request url', () => {
        const request = '/customers/chris/identifier';

        const contextMatcher = new ContextMatcher(request, db).isInDB();

        expect(contextMatcher).to.equal('/customers/{id}/identifier');
      });

      context('when the path has one field different', () => {
        it('should return null if the path does not exist', () => {
          const request = '/customers/chris/age';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });

    describe('path with different ids', () => {
      context('when the path contain one id and two parameters', () => {
        it('should return the proper endpoint', () => {
          const request = '/customers/123/data?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.equal('/customers/{id}/data?name={d1}&dateOfBirth={d2}');
        });
      });
      context('when the path contain more parameters than the db has', () => {
        it('should return undefined', () => {
          const request = '/customers/123/friend?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.undefined;
        });
      });
    });

    describe('path without any id', () => {
      context('when the paths are the same', () => {
        it('should return the enpoint', () => {
          const request = '/customers/age';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.equal('/customers/age');
        });
      });
      context('when the paths are different', () => {
        it('should return null', () => {
          const request = '/custome/tall';

          const contextMatcher = new ContextMatcher(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });
  });

  describe('#getScenario', () => {
    describe('one id', () => {
      it('should return the scenario given one specific id', () => {
        const request = '/customers/mark/identifier';
        const contextMatcher = new ContextMatcher(request, db);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenario(endpoint);

        expect(scenario).to.deep.equal({
          _id: 'mark',
          _headers: [],
          description_: 'Mark identifier',
          _body: {
            name: 'Mark',
          },
        });
      });

      context('when more than one scenario is found', () => {
        it('should returns multiple sceanrios found body ', () => {
          const request = '/customers/juan/multiple/scenarios';
          const contextMatcher = new ContextMatcher(request, db);
          const endpoint = contextMatcher.isInDB();

          const result = contextMatcher.getScenario(endpoint);

          expect(result).to.deep.equal({
            errorCode: 500,
            message: 'Multiple scenarios were found :(',
          });
        });
      });

      context(' when no scenario is found', () => {
        it('should return 404 not found body', () => {
          const request = '/customers/lucas/multiple/scenarios';
          const contextMatcher = new ContextMatcher(request, db);
          const endpoint = contextMatcher.isInDB();

          const result = contextMatcher.getScenario(endpoint);

          expect(result).to.deep.equal({
            errorCode: 404,
            message: 'Scenario not found in the resources! :(',
          });
        });
      });
    });

    describe('multiple ids', () => {
      it('should return the scenario given one specific id', () => {
        const request = '/customers/valueOne/data?name=valueTwo&dateOfBirth=valueThree';
        const contextMatcher = new ContextMatcher(request, db);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenario(endpoint);

        expect(scenario).to.deep.equal({
          _headers: [],
          description_: 'Nathan customers data',
          _id: 'valueOne',
          _d1: 'valueTwo',
          _d2: 'valueThree',
          _body: {
            name: 'Nathan',
          },
        });
      });
    });

    describe('no ids', () => {
      it('should return scenario', () => {
        const request = '/customers/age';
        const contextMatcher = new ContextMatcher(request, db);
        const endpoint = contextMatcher.isInDB();

        const scenario = contextMatcher.getScenario(endpoint);

        expect(scenario).to.deep.equal({
          _headers: [],
          description_: 'Nathan customers data',
          _body: {
            name: 'Nathan',
          },
        });
      });

      context('when there are more than two scenarios', () => {
        it('should return 500 with the proper message', () => {
          const request = '/customers/multiple/scenarios';
          const contextMatcher = new ContextMatcher(request, db);
          const endpoint = contextMatcher.isInDB();

          const result = contextMatcher.getScenario(endpoint);

          expect(result).to.deep.equal({
            errorCode: 500,
            message: 'Multiple scenarios were found :(',
          });
        });
      });
    });
  });

  describe('#getKeyValueUri', () => {
    it('should return an array of key values', () => {
      const contextMatcher = new ContextMatcher('/customer/hello/data/any');

      const result = contextMatcher.getKeyValueUri('/customer/{v0}/data/{v1}');

      expect(result).to.deep.equal([{_v0: 'hello'}, {_v1: 'any'}]);
    });
  });

  describe('#splitURI', () => {
    ['/', '&', '='].forEach((icon) => {
      it(`should split by ${icon}`, () => {
        const contextMatcher = new ContextMatcher(null, null);
        const template = `part1${icon}part2`;

        const result = contextMatcher.splitURI(template);

        expect(result).to.deep.equal(['part1', 'part2']);
      });
    });
  });

  describe('#replaceBrakets', () => {
    it(`should split replace { } for empty`, () => {
      const contextMatcher = new ContextMatcher(null, null);
      const template = `{id}`;

      const result = contextMatcher.getIdFormat(template);

      expect(result).to.equal('_id');
    });
  });
});

const db = {
  '/customers/{id}/identifier': [
    {
      _id: 'Nathan',
      _headers: [],
      description_: 'Nathan identifier',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _id: 'mark',
      _headers: [],
      description_: 'Mark identifier',
      _body: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}': [
    {
      id_: 'Nathan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      id_: 'mark',
      _headers: [],
      description_: 'Mark customers data',
      _body: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}/data?name={d1}&dateOfBirth={d2}': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _id: '123',
      _d1: 'hector',
      _d2: '10-10-200',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _headers: [],
      description_: 'Nathan customers data',
      _id: 'valueOne',
      _d1: 'valueTwo',
      _d2: 'valueThree',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/age': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/multiple/scenarios': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/{id}/multiple/scenarios': [
    {
      _id: 'juan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _id: 'juan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
};
