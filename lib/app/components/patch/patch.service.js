const patchRepository = require('./patch.repository');
const resultHandler = require('../../shared/result-handler');

/**
 * @description #Patch component in charge to return the mock data.
 */
class PatchComponent {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleRequest(req, res) {
    const scenario = patchRepository.findData(req);

    const response = resultHandler(scenario, req);

    res.status(response.status).json(response.body);
  }
}
module.exports = new PatchComponent();
