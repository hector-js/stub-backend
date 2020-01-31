
module.exports = class ResUtils {
  /**
   * update headers.
   * @param {Object} scenario
   * @param {Object} res response.
   */
  static headersRes(scenario, res) {
    if (scenario && scenario._res) {
      const headers = scenario._res._headers;
      if (headers && typeof headers != 'string') {
        headers
            .filter((val) => typeof val == 'string')
            .forEach((value) => res.header(value, `${value}-value`));
        headers
            .filter((val) => typeof val != 'string')
            .forEach((value) => res.header(Object.keys(value)[0], Object.values(value)[0]));
      }
    }
  }
};
