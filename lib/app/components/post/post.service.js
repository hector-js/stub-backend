const postRepository = require('./post.repository');
const ServiceBase = require('./../../shared/bases/service-base');

/**
 * @description #Post service in charge to return the mock data.
 */
class PostService extends ServiceBase {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handlePostRequest(req, res) {
    this.handleRequest(req, res, postRepository);
  }
}
module.exports = new PostService();
