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

        ResUtils.headersRes(scenario, res);

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
            _headers: [{ key1: 'val1' }, { key2: 'val2' }]
          }
        };

        ResUtils.headersRes(scenario, res);

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
          ResUtils.headersRes(value, res);

          expect(db).to.deep.equal([]);
        });
      });
    });
  });
});

