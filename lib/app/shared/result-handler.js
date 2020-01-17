
const negaBodies = require('../utils/constants/negative-bodies');
const ReqUtils = require('../utils/req-utils');

module.exports = resultHandler = (scenario, req) => {
  let status;
  let response;

  if (scenario && !scenario.message) {
    const headersInValid = ReqUtils.hasInvalidElements(scenario._req._headers, req.headers);
    const cookiesInValid = ReqUtils.hasInvalidElements(scenario._req._cookies, req.cookies);
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
      status = scenario._res['_status'] ? scenario._res['_status'] : 200;
      response = scenario._res._body;
    }
  } else if (scenario && scenario.message) {
    status = scenario.errorCode;
    response = scenario;
  }
  return { status: status, body: response };
};
