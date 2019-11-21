
const Data = require('./../../shared/read-db-files');
const ScenarioProvider = require('../../shared/scenario-provider');
const negaBodies = require('../../shared/constants/negative-bodies');

/**
 * Get data from the json files under resources folder.
 */
class GetRespository {
  /**
   * Find data for a specific request.
   * @param {string} request Request.
   * @return {object} Returns scenario found.
   */
  findData(request) {
    const path = request.url;
    const method = request.method;
    const db = Data.db();
    const data = db[method === 'HEAD'?'_head':'_get'];
    
    const scenarioProvider = new ScenarioProvider(path, data);
    const endpoint = scenarioProvider.isInDB();
    return endpoint ? scenarioProvider.getScenario(endpoint) : negaBodies.notFound;
  }
}
module.exports = new GetRespository();
