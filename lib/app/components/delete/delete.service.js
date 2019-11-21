const deleteRepository = require('./delete.repository');
const resultHandler = require('../../shared/result-handler');

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

    res.status(response.status).json(response.body);
  }
}
module.exports = new DeleteComponent();
