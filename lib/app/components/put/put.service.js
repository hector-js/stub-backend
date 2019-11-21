const putRepository = require('./put.repository');
const resultHandler = require('../../shared/result-handler');

/**
 * @description #Put component in charge to return the mock data.
 */
class PutComponent {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleRequest(req, res) {
    const scenario = putRepository.findData(req);

    const response = resultHandler(scenario, req);

    res.status(response.status).json(response.body);
  }
}
module.exports = new PutComponent();
