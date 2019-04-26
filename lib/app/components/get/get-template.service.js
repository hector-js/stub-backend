const getRepository = require('./get.repository');
const negaBodies = require('./../../utils/negative-bodies');
const ReqUtils = require('./../../utils/request-assertions');

class GetComponent {
    handleRequest(context) {
        const req = context.request;
        const res = context.response;

        const body = getRepository.findData(req.url);

        const response = handleResult(body, req);

        res.status(response.status).json(response.body);
    }
}
module.exports = new GetComponent();

const handleResult = (body, req) => {
    var status;
    var response;

    if (body) {
        const headersInValid = ReqUtils.hasNotHeaders(body.headers_, req);
        const cookiesInValid = ReqUtils.hasNotCookies(body.cookies_, req.cookies);

        if (headersInValid && cookiesInValid) {
            status = 401;
            response = {
                errorCode: 401,
                message: 'Cookie and header not found in the request! :('
            };
        } else if (headersInValid) {
            status = 401;
            response = negaBodies.unauhtorized;
        } else if (cookiesInValid) {
            status = 401;
            response = {
                errorCode: 401,
                message: 'Cookie not found in the request! :('
            };
        } else {
            status = 200;
            response = body.body_;
        }
    } else {
        status = 404;
        response = negaBodies.notFound;
    }
    return { status: status, body: response };
};
