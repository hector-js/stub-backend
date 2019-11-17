'use strict';

const ScenarioProvider = require('../lib/app/shared/scenario-provider');
const chai = require('chai');
const db = require('./data/scenario-provider.1.test');
const dbPost = require('./data/scenario-provider.2.test');

const expect = chai.expect;

describe('scenario provider', () => {
  describe('#isInDB', () => {
    describe('path with one id', () => {
      it('should return endpoint selected if the path macths with the request url', () => {
        const request = '/customers/chris/identifier';

        const contextMatcher = new ScenarioProvider(request, db).isInDB();

        expect(contextMatcher).to.equal('/customers/{id}/identifier');
      });

      context('when the path has one field different', () => {
        it('should return null if the path does not exist', () => {
          const request = '/customers/chris/age';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });

    describe('path with different ids', () => {
      context('when the path contain one id and two parameters', () => {
        it('should return the proper endpoint', () => {
          const request = '/customers/123/data?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.equal('/customers/{id}/data?name={d1}&dateOfBirth={d2}');
        });
      });
      context('when the path contain more parameters than the db has', () => {
        it('should return undefined', () => {
          const request = '/customers/123/friend?name=hector&dateOfBirth=12122000';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.undefined;
        });
      });
    });

    describe('path without any id', () => {
      context('when the paths are the same', () => {
        it('should return the enpoint', () => {
          const request = '/customers/age';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.equal('/customers/age');
        });
      });
      context('when the paths are different', () => {
        it('should return null', () => {
          const request = '/custome/tall';

          const contextMatcher = new ScenarioProvider(request, db).isInDB();

          expect(contextMatcher).to.be.undefined;
        });
      });
    });
  });

  describe('#getScenario', () => {
    describe('with unique scenario', ()=>{
      describe('one id', () => {
        it('should return the scenario given one specific id', () => {
          const request = '/customers/mark/identifier';
          const contextMatcher = new ScenarioProvider(request, db);
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
            const contextMatcher = new ScenarioProvider(request, db);
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
            const contextMatcher = new ScenarioProvider(request, db);
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
          const contextMatcher = new ScenarioProvider(request, db);
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
          const contextMatcher = new ScenarioProvider(request, db);
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
            const contextMatcher = new ScenarioProvider(request, db);
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

    describe('with multiple scenarios', ()=>{
      let scenarioProvider;
      beforeEach(()=> {
        scenarioProvider = new ScenarioProvider(null, null);
      });

      it('should return the scenario with the same request', ()=>{
        const body = {
          data: 'data1',
        };

        const scenario = scenarioProvider.filterByRequest(body, dbPost);

        expect(scenario).to.deep.equal({
          _id: 'juan',
          _headers: [],
          _requestBody: {
            data: 'data1',
          },
          description_: 'Nathan customers data',
          _body: {
            name: 'Nathan',
          },
        });
      });

      it('should return not request found when no request is found', ()=>{
        const body = {
          data: 'data5',
        };

        const scenario = scenarioProvider.filterByRequest(body, dbPost);

        expect(scenario).to.deep.equal({
          errorCode: 404,
          message: 'Request body not found in the resources! :(',
        });
      });

      it('should return the first scenario found', ()=>{
        const body = {
          data: 'data6',
        };

        const scenario = scenarioProvider.filterByRequest(body, dbPost);

        expect(Array.isArray(scenario)).to.be.false;
        expect(scenario).to.deep.equal( {
          _id: 'juan',
          _headers: [],
          _requestBody: {
            data: 'data6',
          },
          description_: 'Nathan customers data',
          _body: {
            name: 'first',
          },
        });
      });
    });
  });

  describe('#getKeyValueUri', () => {
    it('should return an array of key values', () => {
      const contextMatcher = new ScenarioProvider('/customer/hello/data/any');

      const result = contextMatcher.getKeyValueUri('/customer/{v0}/data/{v1}');

      expect(result).to.deep.equal([{_v0: 'hello'}, {_v1: 'any'}]);
    });
  });
});
