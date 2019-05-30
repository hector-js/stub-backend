const postRepository = require('./post.repository');
const negaBodies = require('./../../utils/negative-bodies');
const ReqUtils = require('./../../utils/request-assertions');

class PostComponent {
    handleRequest(context) {
        const req = context.request;
        const res = context.response;

        const body = postRepository.findData(req.body);

        res.status(200).json(body);
    }
}
module.exports = new PostComponent();

