const putRepository = require('./put.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #PUT service in charge to return the data and handle the response.
 */
class PutService extends ServiceBase {
  /**
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePutRequest(req, res) {
    this.handleRequest(req, res, putRepository);
  }
}
module.exports = new PutService();
