'use strict';

const BodyUtils = require('../../../lib/app/utils/body-utils');
const chai = require('chai');

const expect = chai.expect;

describe('bodyUtils', () => {
  describe('json', () => {
    let jsonA;
    let jsonB;
    let jsonExcludePaths;
    let result;

    it(`should return true when jsonA is equal to jsonB`, () => {
      jsonA = { var1: 'var-1', var2: 'var-2' };
      jsonB = { var2: 'var-2', var1: 'var-1' };

      result = BodyUtils.compareBodyJSON(jsonA, jsonB);

      expect(result).to.be.true;
    });

    context('with childs', () => {
      it(`should return true when jsonA is equal to jsonB`, () => {
        jsonA = { var1: 'var-1', var2: 'var-2', object: { data: 'any' } };
        jsonB = { var2: 'var-2', var1: 'var-1', object: { data: 'any' } };

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.true;
      });
    });

    context('when jsonA has the value of one variable different to jsonB', () => {
      it(`should return false`, () => {
        jsonA = { var1: 'var1', var2: 'var-2' };
        jsonB = { var2: 'var-2', var1: 'var-1' };

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonA has the key different to jsonB', () => {
      it(`should return false`, () => {
        jsonA = { var0: 'var-1', var2: 'var-2' };
        jsonB = { var2: 'var-2', var1: 'var-1' };

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonA has a key value different to jsonB', () => {
      it(`should return false`, () => {
        jsonA = { var2: 'var-2' };
        jsonB = { var2: 'var-2', var1: 'var-1' };

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonA is undefined and jsonB as well', () => {
      it('should return true', () => {
        jsonA = undefined;
        jsonB = undefined;

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.true;
      });
    });

    context('when jsonA is undefined and jsonB contains a value', () => {
      it('should return true', () => {
        jsonA = undefined;
        jsonB = { var1: 'var-1' };

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    context('when jsonB is undefined and jsonA contains a value', () => {
      it('should return true', () => {
        jsonA = { var1: 'var-1' };
        jsonB = undefined;

        result = BodyUtils.compareBodyJSON(jsonA, jsonB);

        expect(result).to.be.false;
      });
    });

    describe('jsonExclPaths', () => {
      context('when jsonpath exists', () => {
        context('with jsonpath matching', () => {
          context('for just jsonA', () => {
            it('returns false', () => {
              jsonA = { var1: 'var-1', var2: 'other' };
              jsonB = { var3: 'var-2', var1: 'var-1' };
              jsonExcludePaths = ['$.var2'];

              result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

              expect(result).to.be.false;
            });
          });

          context('for just jsonB', () => {
            it('returns false', () => {
              jsonA = { var1: 'var-1', var3: 'other' };
              jsonB = { var2: 'var-2', var1: 'var-1' };
              jsonExcludePaths = ['$.var2'];

              result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

              expect(result).to.be.false;
            });
          });

          context('for jsonA and jsonB', () => {
            it('returns true', () => {
              jsonA = { var1: 'var-1', var2: 'other' };
              jsonB = { var2: 'var-2', var1: 'var-1' };
              jsonExcludePaths = ['$.var2'];

              result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

              expect(result).to.be.true;
            });
          });

          context('complex scenario', () => {
            context('array', () => {
              it('returns true', () => {
                jsonA = { var1: 'var-1', var2: ['value1', 'value2', 'value4'] };
                jsonB = { var1: 'var-1', var2: ['value1', 'value3', 'value4'] };
                jsonExcludePaths = ['$.var2[1]'];

                result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

                expect(result).to.be.true;
              });
            });

            context('object', () => {
              it('returns true', () => {
                jsonA = { var1: 'var-1', var2: { var3: 'any' } };
                jsonB = { var1: 'var-1', var2: { var4: 'any' } };
                jsonExcludePaths = ['$.var2'];

                result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

                expect(result).to.be.true;
              });
            });
          });
        });

        context('with no xpath matching', () => {
          context('with different jsons', () => {
            it('returns false', () => {
              jsonA = { var1: 'var-1', var2: 'other' };
              jsonB = { var2: 'var-2', var1: 'var-1' };
              jsonExcludePaths = ['$.var3'];

              result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

              expect(result).to.be.false;
            });
          });

          context('with same jsons', () => {
            it('returns true', () => {
              jsonA = { var1: 'var-1', var2: 'var-2' };
              jsonB = { var2: 'var-2', var1: 'var-1' };
              jsonExcludePaths = ['$.var3'];

              result = BodyUtils.compareBodyJSON(jsonA, jsonB, jsonExcludePaths);

              expect(result).to.be.true;
            });
          });
        });
      });

      context('when xpath does not exist', () => {
        context('with different jsons', () => {
          it('returns false', () => {
            jsonA = { var1: 'var-1', var2: 'other' };
            jsonB = { var2: 'var-2', var1: 'var-1' };

            result = BodyUtils.compareBodyJSON(jsonA, jsonB);

            expect(result).to.be.false;
          });
        });

        context('with same jsons', () => {
          it('returns true', () => {
            jsonA = { var1: 'var-1', var2: 'var-2' };
            jsonB = { var2: 'var-2', var1: 'var-1' };

            result = BodyUtils.compareBodyJSON(jsonA, jsonB);

            expect(result).to.be.true;
          });
        });
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

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.true;
      });
    });

    context('when xmlA contains a different key than xmlB', () => {
      it('should return false', () => {
        xmlA = '<xml><book><title>a</title><date>1</date></book></xml>';
        xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.false;
      });
    });

    context('when xmlA and xmlB are undefined ', () => {
      it('should return true', () => {
        xmlA = undefined;
        xmlB = undefined;

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.true;
      });
    });

    context('when xmlA is undefined and xmlB contains a value ', () => {
      it('should return false', () => {
        xmlA = undefined;
        xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.false;
      });
    });

    context('when xmlB is undefined and xmlA contains a value ', () => {
      it('should return false', () => {
        xmlA = '<xml><book><title>a</title><dat>1</dat></book></xml>';
        xmlB = undefined;

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.false;
      });
    });

    context('when xmlA is not a xml', () => {
      it('should return false', () => {
        xmlA = '<xml><book><title>a</title><dat>1</dat></book>';
        xmlB = '<xml><book><title>a</title><dat>1</dat></book></xml>';

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.false;
      });
    });

    context('when xmlB is not a xml', () => {
      it('should return false', () => {
        xmlA = '<xml><book><title>a</title><dat>1</dat></book></xml>';
        xmlB = '<xml><book><title>a</title><dat>1</dat></book>';

        result = BodyUtils.compareXML(xmlA, xmlB);

        expect(result).to.be.false;
      });
    });
  });
});
