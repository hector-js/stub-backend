const equal = require('deep-equal');
const jp = require('jsonpath');
const { isObject } = require('./core-utils');

module.exports = class PathUtils {
  /**
   * Compare json with paths
   * @param {object} jsonA
   * @param {object} pathsObjs
   * @param {Array} jsonExcludePaths
   * @return {boolean} object is equal.
   */
  static comparePathBody(jsonA, pathsObjs, jsonExcludePaths) {
    const sanitizePaths = pathsObjs ? Object.keys(pathsObjs) : [];
    if (jsonExcludePaths) {
      const jsonA_ = Object.assign({}, jsonA);
      this.replaceByPath(jsonA_, pathsObjs);
      this.setValueNullMatches(jsonExcludePaths, jsonA_);
      const pathsObjs_ = this.getValuePath(sanitizePaths, jsonA_);
      this.setValueNullMatches(jsonExcludePaths, jsonA);
      return this.checkValid(jsonA, pathsObjs_);
    } else if (Array.isArray(pathsObjs)) {
      return this.checkValidArray(jsonA, pathsObjs);
    } else if (pathsObjs) {
      return this.checkValid(jsonA, pathsObjs);
    } else {
      return true;
    }
  }

  /**
   * Replace value by path
   * @param {object} jsonA body to compare
   * @param {object} pathsObjs key values
   */
  static replaceByPath(jsonA, pathsObjs) {
    Object.keys(pathsObjs).forEach((pathObj) =>
      jp.value(jsonA, pathObj, pathsObjs[pathObj])
    );
  }

  /**
   * Check valid path
   * @param {object} jsonA body
   * @param {object} pathsObjs
   * @return {boolean} object is equal.
   */
  static checkValid(jsonA, pathsObjs) {
    let valid = true;
    Object.keys(pathsObjs).forEach((key) => {
      const jsonAVal = jp.value(jsonA, key);
      valid = valid && equal(jsonAVal, pathsObjs[key]);
    });
    return valid;
  }

  /**
   * Check valid path
   * @param {object} jsonA body
   * @param {object} pathsObjs
   * @return {boolean} object is equal.
   */
  static checkValidArray(jsonA, pathsObjs) {
    let valid = true;
    pathsObjs.forEach((path) => {
      if (isObject(path)) {
        valid = valid && this.checkValid(jsonA, path);
      } else if (typeof path === 'string') {
        valid = valid && !!jp.value(jsonA, path);
      } else {
        valid = false;
      }
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
   * @param {object} keyPaths
   * @param {object} jsonA
   * @return {object}
   */
  static getValuePath(keyPaths, jsonA) {
    const obj = {};
    keyPaths.forEach((key) => (obj[key] = jp.value(jsonA, key)));
    return obj;
  }
};
