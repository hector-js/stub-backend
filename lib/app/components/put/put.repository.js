
const Data = require('../../shared/read-db-files');
const ScenarioBase = require('../../shared/bases/scenario-base');

/**
 * @description Deal with the data related to a PUT method.
 */
class PutRespository extends ScenarioBase {
  /**
   * @description Find all scenarios for a specific request.
   * @param {object} request Request.
   * @return {object} Returns all the scenarios fot PUT method
   */
  findData(request) {
    return this.provideScenarios(request, Data.dbByMethod('_put'));
  }
}
module.exports = new PutRespository();
