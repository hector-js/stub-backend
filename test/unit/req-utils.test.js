'use strict';

const ReqUtils = require('../../lib/app/shared/utils/req-utils');
const chai = require('chai');

const expect = chai.expect;

describe('request utils', () => {
  describe('#hasCookies', () => {
    let cookiesArr;
    let cookiesReq;
    let result;
    describe('cookie with key and Value', () => {
      context('when the request does not contain any cookie', () => {
        [undefined, null].forEach((value)=>{
          it(`should return false for ${value}`, () => {
            cookiesArr = [{session: '1234'}];
            cookiesReq = value;

            result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

            expect(result).to.be.false;
          });
        });
      });

      context('when all the cookies have the same key and value', () => {
        it(`should return false`, () => {
          cookiesArr = [{session: '1234'}];
          cookiesReq = {session: '1234'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.false;
        });
      });

      context('when one cookie is not matching with different size', () => {
        it(`should return true`, () => {
          cookiesArr = [{session: '1234'}, {product: '54321'}];
          cookiesReq = {session: '1234'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.true;
        });
      });

      context('when one cookie is not matching with same size', () => {
        it(`should return true`, () => {
          cookiesArr = [{session: '1234'}, {product: '54321'}];
          cookiesReq = {session: '1234', product: '123'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.true;
        });
      });

      context('when the scenario does not contain any cookie and the request contain one', () => {
        [undefined, null, []].forEach((value)=>{
          it(`should not validate cookes and returns false for ${value}`, () => {
            cookiesArr = value;
            cookiesReq = {session: '1234'};

            result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

            expect(result).to.be.false;
          });
        });
      });
    });

    describe('cookie with just key', ()=>{
      context('when the request does not contain any cookie', () => {
        [undefined, null].forEach((value)=>{
          it(`should return false for ${value}`, () => {
            cookiesArr = ['session'];
            cookiesReq = value;

            result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

            expect(result).to.be.false;
          });
        });
      });

      context('when all the cookies have the same key and value', () => {
        it(`should return false`, () => {
          cookiesArr = ['session'];
          cookiesReq = {session: '1234'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.false;
        });
      });

      context('when one cookie is not matching with different size', () => {
        it(`should return true`, () => {
          cookiesArr = ['session', 'product'];
          cookiesReq = {session: '1234'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.true;
        });
      });

      context('when one cookie is not matching with same size', () => {
        it(`should return true`, () => {
          cookiesArr = ['session', 'productu'];
          cookiesReq = {session: '1234', product: '123'};

          result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

          expect(result).to.be.true;
        });
      });

      context('when the scenario does not contain any cookie and the request contain one', () => {
        [undefined, null, []].forEach((value)=>{
          it(`should not validate cookie and returns false for ${value}`, () => {
            cookiesArr = value;
            cookiesReq = {'session': '1234'};

            result = ReqUtils.hasInvalidCookies(cookiesArr, cookiesReq);

            expect(result).to.be.false;
          });
        });
      });
    });
  });
});

