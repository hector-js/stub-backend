const getRepository = require('./get.repository');
const resultHandler = require('./../../shared/result-handler');
const buildResponse = require('./../../shared/build-response');


/**
 * @description #Get component in charce to return the mock data.
 */
class GetComponent {
  /**
   * Adds two numbers together.
   * @param {object} req Request.
   * @param {object} res Response.
   * @param {object} next Next.
   */
  handleRequest(req, res) {
    const scenario = getRepository.findData(req);

    const response = resultHandler(scenario, req);

    buildResponse(res, response, !!scenario['_xml']);
  }
}

module.exports = new GetComponent();
