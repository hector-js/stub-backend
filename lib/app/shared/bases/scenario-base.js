const ScenarioProvider = require('../scenario-provider');
const { id } = require('./../../components/status/status.router');

module.exports = class ScenarioBase {
  /**
   * @param {string} req request.
   * @param {object} db data related to the method.
   * @param {string} identifier request id.
   * @return {object} Return an array of scenarios.
   */
  provideScenarios(req, db) {
    const scenarioProvider = new ScenarioProvider(req.url, db, req.headers, req.cookies, id(req.path));
    const endpointScenario = scenarioProvider.isInDB();
    const scenarios = scenarioProvider.getScenarios(endpointScenario);

    return Array.isArray(scenarios) ? scenarioProvider.filterByRequest(req, scenarios) : scenarios;
  }
};
