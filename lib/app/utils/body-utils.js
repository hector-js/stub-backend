const convert = require('xml-js');
const equal = require('deep-equal');
const parser = require('fast-xml-parser');
const jp = require('jsonpath');

module.exports = class BodyUtils {
  /**
   * Compare two json
   * @param {object} jsonA
   * @param {object} jsonB
   * @param {Array} jsonExcludePaths
   * @return {boolean} object is equal.
   */
  static compareBodyJSON(jsonA, jsonB, jsonExcludePaths) {
    if (jsonExcludePaths) {
      jsonExcludePaths
          .forEach((jsonPath) => {
            jp.value(jsonA, jsonPath, null);
            jp.value(jsonB, jsonPath, null);
          });
    }
    return equal(jsonA, jsonB);
  };

  /**
   * Compare two xml
   * @param {object} xmlA
   * @param {object} xmlB
   * @return {boolean} object is equal.
   */
  static compareXML(xmlA, xmlB) {
    if (!xmlA && !xmlB) {
      return true;
    }

    if (!xmlA || !xmlB) {
      return false;
    }

    if (parser.XMLValidator.validate(xmlA) === true && parser.XMLValidator.validate(xmlB) === true) {
      const opts = { compact: true, spaces: 2 };
      const jsonA = convert.xml2json(xmlA, opts);
      const jsonB = convert.xml2json(xmlB, opts);
      return this.compareBodyJSON(jsonA, jsonB);
    }
    return false;
  };
};
