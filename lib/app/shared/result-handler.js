
const negaBodies = require('../utils/constants/negative-bodies');

module.exports = resultHandler = (scenario, req) => {
  let status;
  let response;

  if (scenario && !scenario.message) {
    if (scenario._req) {
      if (!scenario._res) {
        status = negaBodies.resMissed.errorCode;
        response = negaBodies.resMissed;
      } else {
        status = scenario._res['_status'] ? scenario._res['_status'] : 200;
        response = scenario._res._body;
      }
    } else {
      status = negaBodies.reqMissed.errorCode;
      response = negaBodies.reqMissed;
    }
  } else if (scenario && scenario.message) {
    status = scenario.errorCode;
    response = scenario;
  }
  return { status: status, body: response };
};
