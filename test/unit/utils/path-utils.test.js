'use strict';

const PathUtils = require('./../../../lib/app/utils/path-utils');
const chai = require('chai');

const expect = chai.expect;

describe('bodyPathUtils', () => {
  describe('json', () => {
    let jsonA;
    let paths;
    let jsonExcludePaths;
    let result;

    describe('match', () => {
      describe('one path', () => {
        context('when json A matchs with path checking string value', () => {
          it('returns true', () => {
            jsonA = { var1: 'var-1', var2: 'other' };
            paths = [{ '$.var1': 'var-1' }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.true;
          });
        });

        context('when json A matchs with path checking object value', () => {
          it('returns true', () => {
            jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
            paths = [{ '$.var2.var4': { var5: 'var-5' } }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.true;
          });
        });

        describe('exclude paths', () => {
          context('when jsonA part is excluded and path is validating the exclusion', () => {
            it('returns true', () => {
              jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
              paths = [{ '$.var2.var4': { var5: 'var-5' } }];
              jsonExcludePaths = ['$.var2.var4'];

              result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

              expect(result).to.be.true;
            });
          });

          context('when the path contains some section excluded', () => {
            it('returns true', () => {
              jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
              paths = [{ '$.var2': { var3: 'var-3', var4: { var5: 'var-6' } } }];
              jsonExcludePaths = ['$.var2.var4.var5'];

              result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

              expect(result).to.be.true;
            });
          });
        });
      });

      describe('multiple paths', () => {
        context('when jsonA matchs with two paths', () => {
          it('returns true', () => {
            jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
            paths = [{ '$.var2.var4': { var5: 'var-5' } }, { '$.var2.var3': 'var-3' }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.true;
          });
        });
      });
    });

    describe('no paths', () => {
      [[], null, undefined].forEach((value) => {
        context(`when path is ${value}`, () => {
          it('returns true', () => {
            jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
            paths = value;
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.true;
          });
        });
      });
    });

    describe('no match', () => {
      describe('one path', () => {
        context('when json A does not match with path checking string value', () => {
          it('returns false', () => {
            jsonA = { var1: 'var-1', var2: 'other' };
            paths = [{ '$.var1': 'var-2' }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.false;
          });
        });

        context('when json A does not match with path checking object value', () => {
          it('returns false', () => {
            jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
            paths = [{ '$.var2.var4': { var5: 'var-5', var6: 'var-6' } }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.false;
          });
        });

        describe('exclude paths', () => {
          context('when the path contains some section excluded and a value no exclude does not match', () => {
            it('returns false', () => {
              jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
              paths = [{ '$.var2': { var3: 'var-2', var4: { var5: 'var-6' } } }];
              jsonExcludePaths = ['$.var2.var4.var5'];

              result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

              expect(result).to.be.false;
            });
          });
        });
      });

      describe('multiple paths', () => {
        context('when jsonA matchs with one element, but no with the second one', () => {
          it('returns false', () => {
            jsonA = { var1: 'var-1', var2: { var3: 'var-3', var4: { var5: 'var-5' } } };
            paths = [{ '$.var2.var4': { var5: 'var-5' } }, { '$.var2.var3': 'var-4' }];
            jsonExcludePaths = null;

            result = PathUtils.comparePathBody(jsonA, paths, jsonExcludePaths);

            expect(result).to.be.false;
          });
        });
      });
    });
  });
});

