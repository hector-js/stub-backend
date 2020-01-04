const postRepository = require('./post.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #POST service in charge to return the data and handle the response.
 */
class PostService extends ServiceBase {
  /**
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePostRequest(req, res) {
    this.handleRequest(req, res, postRepository);
  }
}
module.exports = new PostService();
