'use strict';

const DBUtils = require('./../../../lib/app/utils/db-utils');
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

    it(`should return true when the req string is the wildcard '*'`, () => {
      const stringOne = `*`;
      const stringTwo = `anything`;

      const result = DBUtils.isEq(stringOne, stringTwo);

      expect(result).to.be.true;
    });
  });
});

