
const Data = require('./../../shared/read-db-files');
const ScenarioProvider = require('../../shared/scenario-provider');
const negaBodies = require('../../shared/constants/negative-bodies');

/**
 * Get data from the json files under resources folder.
 */
class GetRespository {
  /**
   * Find data for a specific request.
   * @param {string} path Path coming from the request.
   * @return {object} Returns scenario found.
   */
  findData(path) {
    const db = Data.db();
    const scenarioProvider = new ScenarioProvider(path, db['_get']);
    const endpoint = scenarioProvider.isInDB();
    return endpoint ? scenarioProvider.getScenario(endpoint, true) : negaBodies.notFound;
  }
}
module.exports = new GetRespository();
