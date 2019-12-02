const postRepository = require('./post.repository');
const resultHandler = require('./../../shared/result-handler');
const buildResponse = require('./../../shared/build-response');

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

    buildResponse(res, response, !!scenario['_xml']);
  }
}
module.exports = new PostComponent();
