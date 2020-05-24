'use strict';
const retryOps = require('./../../../lib/app/shared/retry-ops');
const fs = require('fs');
const chai = require('chai');

const expect = chai.expect;

describe('retry opts', () => {
  let req;
  let scenario;

  beforeEach(() => deleteTemporaryFile());

  after(() => deleteTemporaryFile());

  describe('having a request already make', () => {
    beforeEach(() => {
      const dir = './test/unit/data/temp';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const tempFile = {
        ids: [
          'GET-customersA123productquery9id23-11144',
          'POST-customersA123productquery9id23-11145',
          'POST-customersA123productquery9id23-11145'
        ]
      };
      fs.writeFileSync('./test/unit/data/temp/temp.json', JSON.stringify(tempFile, null, 2));

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
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(response).to.deep.equal({
        _body: {
          code: 'GB'
        }
      });
    });

    context('_retry is 0', () => {
      it('returns _res scenario', () => {
        scenario._retry = 0;

        const response = retryOps(req, scenario, './test/unit/data/');

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

        const response = retryOps(req, scenario, './test/unit/data/');

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });
  });

  describe('having two requests already make', () => {
    beforeEach(() => {
      const dir = './test/unit/data/temp';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const tempFile = {
        ids: [
          'GET-customersA123productquery9id23-11144',
          'POST-customersA123productquery9id23-11145',
          'POST-customersA123productquery9id23-11145'
        ]
      };
      fs.writeFileSync('./test/unit/data/temp/temp.json', JSON.stringify(tempFile, null, 2));

      req = {
        method: 'POST',
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
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(response).to.deep.equal({
        _body: {
          code: 'NG'
        }
      });
    });

    context('_retry is 0', () => {
      it('returns _res scenario', () => {
        scenario._retry = 0;

        const response = retryOps(req, scenario, './test/unit/data/');

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

        const response = retryOps(req, scenario, './test/unit/data/');

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });
  });

  describe('without any request in the temp.json', () => {
    beforeEach(() => {
      const dir = './test/unit/data/temp';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const tempFile = {
        ids: [
          'GET-customersA123productquery9id23-11144',
          'POST-customersA123productquery9id23-11145',
          'POST-customersA123productquery9id23-11145'
        ]
      };
      fs.writeFileSync('./test/unit/data/temp/temp.json', JSON.stringify(tempFile, null, 2));

      req = {
        method: 'PUT',
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

    it('reponse the main _res ', () => {
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(response).to.deep.equal({
        _body: {
          code: 'SP'
        }
      });
    });

    context('_retry is 0', () => {
      it('returns _res scenario', () => {
        scenario._retry = 0;

        const response = retryOps(req, scenario, './test/unit/data/');

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

        const response = retryOps(req, scenario, './test/unit/data/');

        expect(response).to.deep.equal({
          _body: {
            code: 'SP'
          }
        });
      });
    });
  });

  describe('folder temp doest not exist', () => {
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

    it('creates a folder called temp', () => {
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(checkPath('./test/unit/data/temp/temp.json')).to.be.true;
      expect(response).to.deep.equal({
        _body: {
          code: 'SP'
        }
      });
    });
  });

  describe('already all the requests have been made', () => {
    beforeEach(() => {
      const dir = './test/unit/data/temp';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const tempFile = {
        ids: [
          'GET-customersA123productquery9id23-11145',
          'GET-customersA123productquery9id23-11145'
        ]
      };
      fs.writeFileSync('./test/unit/data/temp/temp.json', JSON.stringify(tempFile, null, 2));

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

    it('deletes all the requests once the number of requests are equal to the retries', () => {
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(checkPath('./test/unit/data/temp/temp.json')).to.be.true;
      expect(response).to.deep.equal({
        _body: {
          code: 'NG'
        }
      });

      let temporaryFile;
      try {
        temporaryFile = fs.readFileSync('./test/unit/data/temp/temp.json').toString();
      } catch (err) {
        console.error(err);
        expect(true).to.be.false;
      }

      const numberOfMatches = JSON.parse(temporaryFile).ids.filter((id) => id === 'GET-customersA123productquery9id23-11145').length;
      expect(numberOfMatches).to.equal(0);
    });
  });

  describe('update temp file when request is made', () => {
    beforeEach(() => {
      const dir = './test/unit/data/temp';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const tempFile = {
        ids: [
          'GET-customersA123productquery9id23-11145'
        ]
      };
      fs.writeFileSync('./test/unit/data/temp/temp.json', JSON.stringify(tempFile, null, 2));

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

    it('updates the temp file', () => {
      const response = retryOps(req, scenario, './test/unit/data/');

      expect(checkPath('./test/unit/data/temp/temp.json')).to.be.true;
      expect(response).to.deep.equal({
        _body: {
          code: 'GB'
        }
      });

      let temporaryFile;
      try {
        temporaryFile = fs.readFileSync('./test/unit/data/temp/temp.json').toString();
      } catch (err) {
        console.error(err);
        expect(true).to.be.false;
      }

      const numberOfMatches = JSON.parse(temporaryFile).ids.filter((id) => id === 'GET-customersA123productquery9id23-11145').length;
      expect(numberOfMatches).to.equal(2);
    });
  });
});

const checkPath = (path) => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    return false;
  }
};

const deleteTemporaryFile = () => {
  const dir = './test/unit/data/temp';
  if (fs.existsSync(dir)) {
    if (fs.existsSync(dir + '/temp.json')) {
      fs.unlinkSync(dir + '/temp.json');
    }
    fs.rmdirSync(dir);
  }
};
