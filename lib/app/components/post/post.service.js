const postRepository = require('./post.repository');

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
    const result = postRepository.findData(req.body);

    res.status(200).json(result.response);
  }
}
module.exports = new PostComponent();
