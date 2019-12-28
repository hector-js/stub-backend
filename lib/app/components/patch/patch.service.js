const patchRepository = require('./patch.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #Patch service in charge to return the mock data.
 */
class PatchService extends ServiceBase {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePatchRequest(req, res) {
    this.handleRequest(req, res, patchRepository);
  }
}
module.exports = new PatchService();
