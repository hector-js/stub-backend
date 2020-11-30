const resultHandler = require('./../result-handler');
const buildResponse = require('./../build-response');
const retryOpts = require('./../retry-ops');
const ResUtils = require('./../../utils/res-utils');
const environment = require('./../../../environment/index');
const { id } = require('./../../components/status/status.router');

const args = require('minimist')(process.argv.slice(2));

module.exports = class ServiceBase {
  /**
   * @description Deal with the response.
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} repository respository.
   */
  handleRequest(req, res, repository) {
    const scenario = repository.findData(req, id());

    let response;
    let responseOps = scenario._res;
    if (scenario['_retry']) {
      /**
       * TODO: have a look when the service is executed from different root
       */
      const pathDb = environment.pathDb;
      const relativePath = process.cwd() + pathDb.fromRetry;
      responseOps = retryOpts(req, scenario, relativePath + '/');
      response = { status: responseOps._status ? responseOps._status : 200, body: responseOps._body };
    } else {
      response = resultHandler(scenario, req);
    }
    const delay = setDelay(responseOps);
    ResUtils.setHeadersScenarioToResponse(responseOps, res, scenario && responseOps);
    setTimeout(() => buildResponse(res, response, responseOps && !!responseOps['_xml']), delay);
  }
};

/**
 * @param {object} res
 * @return {number} miliseconds
 */
const setDelay = (res) => {
  const disabled = args['no-delays'] || false;
  return !disabled && res && res._delay ? res._delay : 0;
};

