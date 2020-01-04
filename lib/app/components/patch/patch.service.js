const patchRepository = require('./patch.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #PATCH service in charge to return the data and handle the response.
 */
class PatchService extends ServiceBase {
  /**
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePatchRequest(req, res) {
    this.handleRequest(req, res, patchRepository);
  }
}
module.exports = new PatchService();
