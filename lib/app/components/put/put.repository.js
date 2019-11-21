
const Data = require('../../shared/read-db-files');
const ScenarioProvider = require('../../shared/scenario-provider');

/**
 * Get data from the json files under resources folder.
 */
class PutRespository {
  /**
   * Find Data for a specific request.
   * @param {object} request Body coming from the request.
   * @return {object} Returns the data for that specific request.
   */
  findData(request) {
    const body = request.body;
    const db = Data.dbByMethod('_put');

    const scenarioProvider = new ScenarioProvider(request.url, db);

    const endpointScenario = scenarioProvider.isInDB();

    const scenarios = scenarioProvider.getScenarios(endpointScenario);

    return Array.isArray(scenarios)?scenarioProvider.filterByRequest(body, scenarios): scenarios;
  }
}
module.exports = new PutRespository();
