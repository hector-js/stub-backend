const postRepository = require('./post.repository');
const resultHandler = require('./../../shared/result-handler');

/**
 * @description #Post component in charce to return the mock data.
 */
class PostComponent {
  /**
 * Adds two numbers together.
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
