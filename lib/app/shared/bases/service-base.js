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
    ResUtils.headersRes(scenario, res);

    setTimeout(() => buildResponse(res, response, scenario._res && !!scenario._res['_xml']), delay);
  }
};
