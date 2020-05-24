
module.exports = class ResUtils {
  /**
   * update headers.
   * @param {object} resScenario
   * @param {object} res response
   * @param {boolean} hasHeaders has headers?
   */
  static setHeadersScenarioToResponse(resScenario, res, hasHeaders) {
    if (hasHeaders) {
      const headers = resScenario._headers;
      const cookies = resScenario._cookies;
      buildResponse(headers, res, true);
      buildResponse(cookies, res, false);
    }
  }
};
/**
 * update headers.
 * @param {Object} array
 * @param {Object} res response.
 * @param {Object} isHeader response.
 */
function buildResponse(array, res, isHeader) {
  if (array) {
    if (Array.isArray(array)) {
      array
          .filter((val) => typeof val == 'string')
          .forEach((value) => isHeader ?
          res.header(value, `${value}-value`) :
          res.cookie(value, `${value}-value`));
    } else {
      Object.keys(array)
          .forEach((key) => isHeader ?
          res.header(key, array[key]) :
          res.cookie(key, array[key]));
    }
  }
}
