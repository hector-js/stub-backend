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
   * Compare ignoring cases
   * @param {string} stringOne
   * @param {string} stringTwo
   * @return {boolean} format id.
   */
  static isEq(stringOne, stringTwo) {
    return stringOne.toUpperCase() === stringTwo.toUpperCase();
  };

  /**
   * Compare two objects
   * @param {object} jsonA
   * @param {object} jsonB
   * @return {boolean} object is equal.
   */
  static compareJSON(jsonA, jsonB) {
    return [...new Set([...Object.keys(jsonA), ...Object.keys(jsonB)])].every((k) => k in jsonA && k in jsonB && jsonA[k] === jsonB[k]);
  };

  /**
   * Compare two objects
   * @param {object} xmlA
   * @param {object} xmlB
   * @return {boolean} object is equal.
   */
  static compareXML(xmlA, xmlB) {
    return xmlA === xmlB;
  };
};
