const postRepository = require('./post.repository');
const negaBodies = require('./../../utils/negative-bodies');
const ReqUtils = require('./../../utils/request-assertions');

class PostComponent {
    handleRequest(req, res) {
        const result = postRepository.findData(req.body);

        res.status(200).json(result.response);
    }
}
module.exports = new PostComponent();

