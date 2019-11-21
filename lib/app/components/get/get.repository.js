
const Data = require('./../../shared/read-db-files');
const ScenarioProvider = require('../../shared/scenario-provider');
const negaBodies = require('../../shared/constants/negative-bodies');

/**
 * Get data from the json files under resources folder.
 */
class GetRespository {
  /**
   * Find data for a specific request.
   * @param {string} req Request.
   * @return {object} Returns scenario found.
   */
  findData(req) {
    const path = req.url;
    const method = req.method;
    const db = Data.db();
    let data;
    switch (method) {
      case 'HEAD':
        data = db['_head'];
        break;
      case 'GET':
        data = db['_get'];
        break;
      default:
        data = db['_get'];
    }
    const scenarioProvider = new ScenarioProvider(path, data);
    const endpoint = scenarioProvider.isInDB();
    return endpoint ? scenarioProvider.getScenario(endpoint) : negaBodies.notFound;
  }
}
module.exports = new GetRespository();
