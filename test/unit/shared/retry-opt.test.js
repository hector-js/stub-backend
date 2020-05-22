'use strict';
const retryOps = require('./../../../lib/app/shared/retry-ops');

const chai = require('chai');

const expect = chai.expect;

describe.only('retry opts', () => {
  let req;
  let scenario;
  describe('having a request already make', () => {
    beforeEach(() => {
      req = {
        method: 'GET',
        path: '/customers/A123/product?query=9&id=23'
      };
      scenario = {
        _req: {
          _id1: 'A123',
          _id2: 'B123'
        },
        _res: {
          _body: {
            code: 'SP'
          }
        },
        _retry: 1,
        _resRetry: [
          {
            _body: {
              code: 'GB'
            }
          },
          {
            _body: {
              code: 'NG'
            }
          }
        ]
      };
    });

    it('reponse the second _res ', () => {
      const response = retryOps(req, scenario);

      expect(response).to.deep.equal({
        _body: {
          code: 'GB'
        }
      });
    });

    context('_retry is 0', () => {
      it('returns _res scenario', () => {
        scenario._retry = 0;

        const response = retryOps(req, scenario);

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });

    context('_retry is undefined', () => {
      it('returns _res scenario', () => {
        scenario._retry = undefined;

        const response = retryOps(req, scenario);

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });
  });

  describe('having two request already make', () => {
    beforeEach(() => {
      req = {
        method: 'POST',
        path: '/customers/A123/product?query=9&id=23',
      };
      scenario = {
        _req: {
          _id1: 'A123',
          _id2: 'B123'
        },
        _res: {
          _body: {
            code: 'SP'
          }
        },
        _retry: 2,
        _resRetry: [
          {
            _body: {
              code: 'GB'
            }
          },
          {
            _body: {
              code: 'NG'
            }
          }
        ]
      };
    });

    it('reponse the second _res ', () => {
      const response = retryOps(req, scenario);

      expect(response).to.deep.equal({
        _body: {
          code: 'NG'
        }
      });
    });

    context('_retry is 0', () => {
      it('returns _res scenario', () => {
        scenario._retry = 0;

        const response = retryOps(req, scenario);

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });

    context('_retry is undefined', () => {
      it('returns _res scenario', () => {
        scenario._retry = undefined;

        const response = retryOps(req, scenario);

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });
  });
});
