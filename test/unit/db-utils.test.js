'use strict';

const DBUtils = require('./../../lib/app/shared/utils/db-utils');
const chai = require('chai');

const expect = chai.expect;

describe('db utils', () => {
  describe('#splitURI', () => {
    ['/', '&', '='].forEach((icon) => {
      it(`should split by ${icon}`, () => {
        const template = `part1${icon}part2`;

        const result = DBUtils.splitURI(template);

        expect(result).to.deep.equal(['part1', 'part2']);
      });
    });
  });

  describe('#replaceBrakets', () => {
    it(`should replace "{" and "}" for empty and add "_" at the beginning`, () => {
      const template = `{id}`;

      const result = DBUtils.getIdFormat(template);

      expect(result).to.equal('_id');
    });
  });

  describe('#isEq', () => {
    it(`should return true ignoring cases`, () => {
      const stringOne = `hello`;
      const stringTwo = `heLlo`;

      const result = DBUtils.isEq(stringOne, stringTwo);

      expect(result).to.be.true;
    });

    it(`should return false when the strings are different ignoring cases`, () => {
      const stringOne = `hella`;
      const stringTwo = `heLlo`;

      const result = DBUtils.isEq(stringOne, stringTwo);

      expect(result).to.be.false;
    });
  });

  describe('#compare', () => {
    describe('json', () => {
      let jsonA;
      let jsonB;
      let result;

      it(`should return true when jsonA is equal to jsonB`, () => {
        jsonA = {var1: 'var-1', var2: 'var-2'};
        jsonB = {var2: 'var-2', var1: 'var-1'};

        result = DBUtils.compareJSON(jsonA, jsonB);

        expect(result).to.be.true;
      });

      context('with childs', () => {
        it(`should return true when jsonA is equal to jsonB`, () => {
          jsonA = {var1: 'var-1', var2: 'var-2', object: {data: 'any'}};
          jsonB = {var2: 'var-2', var1: 'var-1', object: {data: 'any'}};

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.true;
        });
      });

      context('when jsonA has the value of one variable different to jsonB', () => {
        it(`should return false`, () => {
          jsonA = {var1: 'var1', var2: 'var-2'};
          jsonB = {var2: 'var-2', var1: 'var-1'};

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.false;
        });
      });

      context('when jsonA has the key different to jsonB', () => {
        it(`should return false`, () => {
          jsonA = {var0: 'var-1', var2: 'var-2'};
          jsonB = {var2: 'var-2', var1: 'var-1'};

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.false;
        });
      });

      context('when jsonA has a key value different to jsonB', () => {
        it(`should return false`, () => {
          jsonA = {var2: 'var-2'};
          jsonB = {var2: 'var-2', var1: 'var-1'};

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.false;
        });
      });

      context('when jsonA is undefined and jsonB as well', () => {
        it('should return true', () => {
          jsonA = undefined;
          jsonB = undefined;

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.true;
        });
      });

      context('when jsonA is undefined and jsonB contains a value', () => {
        it('should return true', () => {
          jsonA = undefined;
          jsonB = {var1: 'var-1'};

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.false;
        });
      });

      context('when jsonB is undefined and jsonA contains a value', () => {
        it('should return true', () => {
          jsonA = {var1: 'var-1'};
          jsonB = undefined;

          result = DBUtils.compareJSON(jsonA, jsonB);

          expect(result).to.be.false;
        });
      });
    });

    describe('xml', () => {
      let xmlA;
      let xmlB;
      let result;

      context('when xmlA contains the same keys and values than xmlB', () => {
        it('should return true', () => {
          xmlA = '<xml><book><title>a</title><date>1</date></book></xml>';
          xmlB = '<xml><book><title>a</title><date>1</date></book></xml>';

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.true;
        });
      });

      context('when xmlA contains a different key than xmlB', () => {
        it('should return false', () => {
          xmlA = '<xml><book><title>a</title><date>1</date></book></xml>';
          xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.false;
        });
      });

      context('when xmlA and xmlB are undefined ', () => {
        it('should return true', () => {
          xmlA = undefined;
          xmlB = undefined;

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.true;
        });
      });

      context('when xmlA is undefined and xmlB contains a value ', () => {
        it('should return false', () => {
          xmlA = undefined;
          xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.false;
        });
      });

      context('when xmlB is undefined and xmlA contains a value ', () => {
        it('should return false', () => {
          xmlA = '<xml><book><title>a</title><dat>1</dat></book></xml>';
          xmlB = undefined;

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.false;
        });
      });

      context('when xmlA is not a xml', () => {
        it('should return false', () => {
          xmlA = '<xml><book><title>a</title><dat>1</dat></book>';
          xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.false;
        });
      });

      context('when xmlB is not a xml', () => {
        it('should return false', () => {
          xmlA = '<xml><book><title>a</title><dat>1</dat></book></xml>';
          xmlB = '<xml><book><title>a</title><dat>1</dat></book>';

          result = DBUtils.compareXML(xmlA, xmlB);

          expect(result).to.be.false;
        });
      });
    });
  });
});

