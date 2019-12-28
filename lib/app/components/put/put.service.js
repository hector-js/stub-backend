const putRepository = require('./put.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #Put service in charge to return the mock data.
 */
class PutService extends ServiceBase {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePutRequest(req, res) {
    this.handleRequest(req, res, putRepository);
  }
}
module.exports = new PutService();
