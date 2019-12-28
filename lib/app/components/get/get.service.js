const getRepository = require('./get.repository');
const ServiceBase = require('./../../shared/bases/service-base');


/**
 * @description #Get service in charce to return the mock data.
 */
class GetService extends ServiceBase {
  /**
   * Adds two numbers together.
   * @param {object} req Request.
   * @param {object} res Response.
   */
  handleGetRequest(req, res) {
    this.handleRequest(req, res, getRepository);
  }
}

module.exports = new GetService();
