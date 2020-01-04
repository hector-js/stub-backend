const deleteRepository = require('./delete.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #DELETE service in charge to return the data and handle the response.
 */
class DeleteService extends ServiceBase {
  /**
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleDeleteRequest(req, res) {
    this.handleRequest(req, res, deleteRepository);
  }
}
module.exports = new DeleteService();
