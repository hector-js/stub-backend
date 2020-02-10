'use strict';

const ReqUtils = require('./../../../lib/app/utils/req-utils');
const chai = require('chai');

const expect = chai.expect;

describe('request utils', () => {
  describe('#hasInvalidElements', () => {
    let elementsArr;
    let elementsReq;
    let result;
    describe('key and Value', () => {
      context('when the request does not contain any element', () => {
        [undefined, null].forEach((value)=>{
          it(`should return false for ${value}`, () => {
            elementsArr = { session: '1234' };
            elementsReq = value;

            result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

            expect(result).to.be.false;
          });
        });
      });

      context('when all the elements have the same key and value', () => {
        it(`should return false`, () => {
          elementsArr = { session: '1234' };
          elementsReq = { session: '1234' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.false;
        });
      });

      context('when one element is not matching with different size', () => {
        it(`should return true`, () => {
          elementsArr = { session: '1234', product: '54321' };
          elementsReq = { session: '1234' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.true;
        });
      });

      context('when one element is not matching with same size', () => {
        it(`should return true`, () => {
          elementsArr = { session: '1234', product: '54321' };
          elementsReq = { session: '1234', product: '123' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.true;
        });
      });

      context('when the scenario does not contain any element and the request contain one', () => {
        [undefined, null, []].forEach((value)=>{
          it(`should not validate elements and returns false for ${value}`, () => {
            elementsArr = value;
            elementsReq = { session: '1234' };

            result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

            expect(result).to.be.false;
          });
        });
      });
    });

    describe('key', ()=>{
      context('when the request does not contain any element', () => {
        [undefined, null].forEach((value)=>{
          it(`should return false for ${value}`, () => {
            elementsArr = ['session'];
            elementsReq = value;

            result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

            expect(result).to.be.false;
          });
        });
      });

      context('when all the elements have the same key and value', () => {
        it(`should return false`, () => {
          elementsArr = ['session'];
          elementsReq = { session: '1234' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.false;
        });
      });

      context('when one elements is not matching with different size', () => {
        it(`should return true`, () => {
          elementsArr = ['session', 'product'];
          elementsReq = { session: '1234' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.true;
        });
      });

      context('when one element is not matching with same size', () => {
        it(`should return true`, () => {
          elementsArr = ['session', 'productu'];
          elementsReq = { session: '1234', product: '123' };

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.true;
        });
      });

      context('when one element is not a string', () => {
        it(`should return false`, () => {
          elementsArr = ['session', {}];
          elementsReq = { session: '1234'};

          result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

          expect(result).to.be.false;
        });
      });

      context('when the scenario does not contain any element and the request contain one', () => {
        [undefined, null, []].forEach((value)=>{
          it(`should not validate element and returns false for ${value}`, () => {
            elementsArr = value;
            elementsReq = { session: '1234' };

            result = ReqUtils.hasInvalidElements(elementsArr, elementsReq);

            expect(result).to.be.false;
          });
        });
      });
    });
  });
});
