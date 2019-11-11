const getRepository = require('./get.repository');
const negaBodies = require('./../../shared/negative-bodies');
const ReqUtils = require('./../../shared/request-assertions');

class GetComponent {
    handleRequest(req, res) {
        const body = getRepository.findData(req.url);

        const response = handleResult(body, req);

        res.status(response.status).json(response.body);
    }
}

module.exports = new GetComponent();

const handleResult = (body, req) => {
    var status;
    var response;

    if (body && !body.message) {
        const headersInValid = ReqUtils.hasNotHeaders(body.headers_, req);
        const cookiesInValid = ReqUtils.hasNotCookies(body.cookies_, req.cookies);
        if (headersInValid && cookiesInValid) {
            status = negaBodies.cookieHeader.errorCode;
            response = negaBodies.cookieHeader;
        } else if (headersInValid) {
            status = 401;
            response = negaBodies.unauhtorized;
        } else if (cookiesInValid) {
            status = negaBodies.cookieNotFound.errorCode;
            response = negaBodies.cookieNotFound;
        } else {
            status = body['status_'] ? body['status_'] : 200;
            response = body.body_;
        }
    } else if(body && body.message){
        status = body.errorCode
        response = body;
    } else {
        status = negaBodies.notFound.errorCode;
        response = negaBodies.notFound;
    }
    return { status: status, body: response };
};
