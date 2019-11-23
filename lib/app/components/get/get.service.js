const getRepository = require('./get.repository');
const resultHandler = require('./../../shared/result-handler');
const path = require('path');

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
    if (req.url.replace('/', '') === '') {
      res.sendFile(path.join(__dirname, '../../..', './resources/main.html'));
    } else if (req.url === '/favicon.ico') {
      res.sendFile(path.join(__dirname, '../../..', './resources/favicon.ico'));
    } else {
      const scenario = getRepository.findData(req);
      const response = resultHandler(scenario, req);
      res.status(response.status).json(response.body);
    }
  }
}

module.exports = new GetComponent();

