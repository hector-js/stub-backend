const { hasObjectKeys, isObject } = require('./core-utils');

module.exports = class ReqUtils {
  /**
   * Adds two numbers together.
   * @param {Array} _elements Elements to check.
   * @param {object} elementReq elementReq in the request.
   * @return {boolean} Return true if the request has not specific
   * cookies in the request.
   */
  static hasInvalidElements(_elements, elementReq) {
    return this.valid(_elements, elementReq) ?
      false :
      !this.matchReqInScenario(_elements, elementReq);
  }

  /**
   * Adds two numbers together.
   * @param {Array} _elements Elements.
   * @param {object} req Request.
   * @return {boolean} Return true if secnario Is matching.
   */
  static matchReqInScenario(_elements, req) {
    let flag = true;

    if (Array.isArray(_elements)) {
      _elements
          .filter((p) => typeof p === 'string' || isObject(p))
          .forEach((elem) => {
            const hasElement = isObject(elem) ?
            hasObjectKeys(elem, req) :
            req[elem.toLowerCase()];
            return (flag = flag && hasElement);
          });
    } else {
      const hasElement = hasObjectKeys(_elements, req);
      return (flag = hasElement);
    }

    return flag;
  }

  /**
   * Validate entry
   * @param {Array} array Elements.
   * @param {object} req Request.
   * @return {boolean} return.
   */
  static valid(array, req) {
    return !req || !array;
  }
};
