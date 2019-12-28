const deleteRepository = require('./delete.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #Delete service in charge to return the mock data.
 */
class DeleteService extends ServiceBase {
  /**
  * Adds two numbers together.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleDeleteRequest(req, res) {
    this.handleRequest(req, res, deleteRepository);
  }
}
module.exports = new DeleteService();
