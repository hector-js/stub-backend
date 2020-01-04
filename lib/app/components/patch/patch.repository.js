
const Data = require('../../shared/read-db-files');
const ScenarioBase = require('../../shared/bases/scenario-base');

/**
 * @description Deal with the data related to a PATCH method.
 */
class PatchRespository extends ScenarioBase {
  /**
   * @description Find all scenarios for a specific request.
   * @param {object} request Request.
   * @return {object} Returns all the scenarios fot PATCH method
   */
  findData(request) {
    return this.provideScenarios(request, Data.dbByMethod('_patch'));
  }
}
module.exports = new PatchRespository();
