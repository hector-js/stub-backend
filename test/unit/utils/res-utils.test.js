'use strict';

const ResUtils = require('../../../lib/app/utils/res-utils');
const chai = require('chai');

const expect = chai.expect;

describe('response utils', () => {
  describe('#headers', () => {
    let scenario;
    let res;
    let db;

    beforeEach(() => {
      db = [];
      res = {
        header(key, value) {
          db.push({ key: key, value: value });
        }
      };
    });

    context('when headers is in array format with each element as string', () => {
      it('updates the headers in the response', () => {
        scenario = {
          _res: { _headers: ['key1', 'key2'] }
        };

        ResUtils.setHeadersScenarioToResponse(scenario, res);

        expect(db).to.deep.equal([
          { key: 'key1', value: 'key1-value' },
          { key: 'key2', value: 'key2-value' }
        ]);
      });
    });

    context('when headers contain key and value', () => {
      it('updates the headers in the response', () => {
        scenario = {
          _res: {
            _headers: { key1: 'val1' ,  key2: 'val2' }
          }
        };

        ResUtils.setHeadersScenarioToResponse(scenario, res);

        expect(db).to.deep.equal([
          { key: 'key1', value: 'val1' },
          { key: 'key2', value: 'val2' }
        ]);
      });
    });

    [
      undefined,
      [],
      null,
      'fd',
      '',
      { res: { _headers: undefined } },
      { res: { _headers: [] } },
      { res: { _headers: null } },
      { res: { _headers: 'fd' } },
      { res: { _headers: '' } }
    ].forEach((value) => {
      context(`when headers field is coming with ${JSON.stringify(value)}`, () => {
        it('does not update any headers', () => {
          ResUtils.setHeadersScenarioToResponse(value, res);

          expect(db).to.deep.equal([]);
        });
      });
    });
  });

  describe('#cookies', () => {
    let scenario;
    let res;
    let db;

    beforeEach(() => {
      db = [];
      res = {
        cookie(key, value) {
          db.push({ key: key, value: value });
        }
      };
    });

    context('when cookies is in array format with each element as string', () => {
      it('updates the cookies in the response', () => {
        scenario = {
          _res: { _cookies: ['key1', 'key2'] }
        };

        ResUtils.setHeadersScenarioToResponse(scenario, res);

        expect(db).to.deep.equal([
          { key: 'key1', value: 'key1-value' },
          { key: 'key2', value: 'key2-value' }
        ]);
      });
    });

    context('when cookies contain key and value', () => {
      it('updates the cookies in the response', () => {
        scenario = {
          _res: {
            _cookies: [{ key1: 'val1' }, { key2: 'val2' }]
          }
        };

        ResUtils.setHeadersScenarioToResponse(scenario, res);

        expect(db).to.deep.equal([
          { key: 'key1', value: 'val1' },
          { key: 'key2', value: 'val2' }
        ]);
      });
    });

    [
      undefined,
      [],
      null,
      'fd',
      '',
      { res: { _cookies: undefined } },
      { res: { _cookies: [] } },
      { res: { _cookies: null } },
      { res: { _cookies: 'fd' } },
      { res: { _cookies: '' } }
    ].forEach((value) => {
      context(`when cookies field is coming with ${JSON.stringify(value)}`, () => {
        it('does not update any headers', () => {
          ResUtils.setHeadersScenarioToResponse(value, res);

          expect(db).to.deep.equal([]);
        });
      });
    });
  });
});

