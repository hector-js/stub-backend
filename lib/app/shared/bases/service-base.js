const resultHandler = require('./../result-handler');
const buildResponse = require('./../build-response');
const ResUtils = require('./../../utils/res-utils');

module.exports = class ServiceBase {
  /**
   * @description Deal with the response.
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} repository respository.
   */
  handleRequest(req, res, repository) {
    const scenario = repository.findData(req);

    const response = resultHandler(scenario, req);
    const delay = scenario._res && scenario._res._delay ? scenario._res._delay : 0;
    ResUtils.setHeadersScenarioToResponse(scenario, res);

    if (scenario['_retry']) {
      console.log('@@@', createID(req, scenario));
    }
    setTimeout(() => buildResponse(res, response, scenario._res && !!scenario._res['_xml']), delay);
  }
};

/**
 * @return {number} identifier
 * @param {object} scenario
 */
function createNumber(scenario) {
  const text = JSON.stringify(scenario);
  let i = 0;
  let count = 0;
  for (i = 0; i < text.length; i++) {
    count = count + text.charCodeAt(i);
  }
  return count;
}

/**
 * @param {object} req
 * @param {object} scenario
 * @return {string} uniqueId
 */
function createID(req, scenario) {
  const method = req.method;
  const pathFormatted = req.path.replace(/\//g, '');
  const uniqueId = createNumber(scenario);
  return `${method}-${pathFormatted}-${uniqueId}`;
}
