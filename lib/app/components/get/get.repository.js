
const Data = require('./../../shared/read-db-files');
const ScenarioProvider = require('../../shared/scenario-provider');
const negaBodies = require('../../utils/constants/negative-bodies');

/**
 * @description Deal with the data related to a GET method.
 */
class GetRespository {
  /**
   * @description Find all scenarios for a specific request.
   * @param {object} request Request.
   * @return {object} Returns a scenario for the method GET
   */
  findData(request) {
    const path = request.url;
    const method = request.method;
    const db = Data.db();
    const data = db[method === 'HEAD'?'_head':'_get'];

    const scenarioProvider = new ScenarioProvider(path, data, request.headers, request.cookies);
    const endpoint = scenarioProvider.isInDB();
    return endpoint ? scenarioProvider.getScenario(endpoint) : negaBodies.notFound;
  }
}
module.exports = new GetRespository();
