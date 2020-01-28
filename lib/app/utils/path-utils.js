const equal = require('deep-equal');
const jp = require('jsonpath');

module.exports = class PathUtils {
  /**
   * Compare json with paths
   * @param {object} jsonA
   * @param {object} pathsObjs
   * @param {Array} jsonExcludePaths
   * @return {boolean} object is equal.
   */
  static comparePathBody(jsonA, pathsObjs, jsonExcludePaths) {
    const sanitizePaths = (pathsObjs ? pathsObjs : []);
    if (jsonExcludePaths) {
      const jsonA_ = Object.assign({}, jsonA);
      this.replaceByPath(sanitizePaths, jsonA_);
      this.setValueNullMatches(jsonExcludePaths, jsonA_);
      const pathsObjs_ = this.getValuePath(sanitizePaths, jsonA_);
      this.setValueNullMatches(jsonExcludePaths, jsonA);
      return this.checkValid(pathsObjs_, jsonA);
    } else if (pathsObjs && pathsObjs.length > 0) {
      return this.checkValid(sanitizePaths, jsonA);
    } else {
      return true;
    }
  };

  /**
   * Replace value by path
   * @param {object} sanitizePaths
   * @param {object} jsonA
   */
  static replaceByPath(sanitizePaths, jsonA) {
    sanitizePaths.forEach((pathObj) => {
      const path = Object.keys(pathObj)[0];
      const value = Object.values(pathObj)[0];
      jp.value(jsonA, path, value);
    });
  }
  /**
   * Check valid path
   * @param {object} sanitizePaths
   * @param {object} jsonA
   * @return {boolean} object is equal.
   */
  static checkValid(sanitizePaths, jsonA) {
    let valid = true;
    sanitizePaths.forEach((pathObj) => {
      const path = Object.keys(pathObj)[0];
      const value = Object.values(pathObj)[0];
      const jsonAVal = jp.value(jsonA, path);
      valid = valid && equal(jsonAVal, value);
    });
    return valid;
  }

  /**
   * Convert to null path matched
   * @param {object} jsonExcludePaths
   * @param {object} jsonA
   */
  static setValueNullMatches(jsonExcludePaths, jsonA) {
    jsonExcludePaths.forEach((jsonPath) => jp.value(jsonA, jsonPath, null));
  }

  /**
   * Compare two xml
   * @param {object} sanitizePaths
   * @param {object} jsonA
   * @return {Array} object is equal.
   */
  static getValuePath(sanitizePaths, jsonA) {
    const pathsObjs_ = [];
    sanitizePaths.forEach((pathObj) => {
      const path = Object.keys(pathObj)[0];
      const obj = {};
      obj[path] = jp.value(jsonA, path);
      pathsObjs_.push(obj);
    });
    return pathsObjs_;
  }
};
