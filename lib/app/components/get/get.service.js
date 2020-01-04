const getRepository = require('./get.repository');
const ServiceBase = require('./../../shared/bases/service-base');


/**
 * @description #GET service in charge to return the data and handle the response.
 */
class GetService extends ServiceBase {
  /**
   * @param {object} req Request.
   * @param {object} res Response.
   */
  handleGetRequest(req, res) {
    this.handleRequest(req, res, getRepository);
  }
}

module.exports = new GetService();
