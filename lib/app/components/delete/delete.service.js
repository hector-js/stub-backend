const deleteRepository = require('./delete.repository');
const resultHandler = require('../../shared/result-handler');
const buildResponse = require('./../../shared/build-response');

/**
 * @description #Delete component in charge to return the mock data.
 */
class DeleteComponent {
  /**
  * Adds two numbers together.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleRequest(req, res) {
    const scenario = deleteRepository.findData(req);

    const response = resultHandler(scenario, req);

    buildResponse(res, response, !!scenario['_xml']);
  }
}
module.exports = new DeleteComponent();
