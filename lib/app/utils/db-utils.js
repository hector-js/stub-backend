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
};
