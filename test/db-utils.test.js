'use strict';

const DBUtils = require('../lib/app/shared/utils/db-utils');
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
    it(`should return true when jsonA is equal to jsaonB`, () => {
      const jsonA = {var1: 'var-1', var2: 'var-2'};
      const jsonB = {var2: 'var-2', var1: 'var-1'};

      const result = DBUtils.compare(jsonA, jsonB);

      expect(result).to.be.true;
    });

    context('when jsonA has the value of one variable different to jsonB', ()=>{
      it(`should return false`, () => {
        const jsonA = {var1: 'var1', var2: 'var-2'};
        const jsonB = {var2: 'var-2', var1: 'var-1'};

        const result = DBUtils.compare(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonA has the key different to jsonB', ()=>{
      it(`should return false`, () => {
        const jsonA = {var0: 'var-1', var2: 'var-2'};
        const jsonB = {var2: 'var-2', var1: 'var-1'};

        const result = DBUtils.compare(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonA has a key value different to jsonB', ()=>{
      it(`should return false`, () => {
        const jsonA = {var2: 'var-2'};
        const jsonB = {var2: 'var-2', var1: 'var-1'};

        const result = DBUtils.compare(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });
  });
});

