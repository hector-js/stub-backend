const convert = require('xml-js');
const equal = require('deep-equal');
const parser = require('fast-xml-parser');

module.exports = class DBUtils {
  /**
   * Returns Path split by /, &, ? and =.
   * @param {string} template Template. i.e. /part1/{id}
   * @return {arrayTo} array.
   */
  static splitURI(template) {
    return template.split(/[\/?=&]+/);
  }

  /**
   * Format identifier
   * @param {string} id Template. i.e. {id}
   * @return {string} format id.
   */
  static getIdFormat(id) {
    return `_${id.replace(/{|}/g, '')}`;
  }

  /**
   * Compare string ignoring cases
   * @param {string} stringOne
   * @param {string} stringTwo
   * @return {boolean} format id.
   */
  static isEq(stringOne, stringTwo) {
    return stringOne.toUpperCase() === stringTwo.toUpperCase();
  };

  /**
   * Compare two json
   * @param {object} jsonA
   * @param {object} jsonB
   * @return {boolean} object is equal.
   */
  static compareJSON(jsonA, jsonB) {
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

    if (parser.validate(xmlA) === true && parser.validate(xmlB) === true) {
      const opts = {compact: true, spaces: 2};
      const jsonA = convert.xml2json(xmlA, opts);
      const jsonB = convert.xml2json(xmlB, opts);
      return this.compareJSON(jsonA, jsonB);
    }
    return false;
  };
};
