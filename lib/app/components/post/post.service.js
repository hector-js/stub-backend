const postRepository = require('./post.repository');
const resultHandler = require('./../../shared/result-handler');

/**
 * @description #Post component in charge to return the mock data.
 */
class PostComponent {
  /**
  * Handle request and return the response.
  * @param {object} req Request.
  * @param {object} res Response.
  */
  handleRequest(req, res) {
    const scenario = postRepository.findData(req);

    const response = resultHandler(scenario, req);

    res.status(response.status).json(response.body);
  }
}
module.exports = new PostComponent();
