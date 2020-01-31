
module.exports = class ResUtils {
  /**
   * update headers.
   * @param {Object} scenario
   * @param {Object} res response.
   */
  static setHeadersScenarioToResponse(scenario, res) {
    if (scenario && scenario._res) {
      const headers = scenario._res._headers;
      const cookies = scenario._res._cookies;
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
  if (array && typeof array != 'string') {
    array
        .filter((val) => typeof val == 'string')
        .forEach((value) => isHeader ?
        res.header(value, `${value}-value`) :
        res.cookie(value, `${value}-value`));
    array
        .filter((val) => typeof val != 'string')
        .forEach((value) => isHeader ?
        res.header(Object.keys(value)[0], Object.values(value)[0]) :
        res.cookie(Object.keys(value)[0], Object.values(value)[0]));
  }
}
