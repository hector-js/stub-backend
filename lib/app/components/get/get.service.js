const getRepository = require('./get.repository');
const resultHandler = require('./../../shared/result-handler');

/**
 * @description #Get component in charce to return the mock data.
 */
class GetComponent {
  /**
   * Adds two numbers together.
   * @param {object} req Request.
   * @param {object} res Response.
   */
  handleRequest(req, res) {
    const scenario = getRepository.findData(req.url);

    const response = resultHandler(scenario, req);

    res.status(response.status).json(response.body);
  }
}

module.exports = new GetComponent();

