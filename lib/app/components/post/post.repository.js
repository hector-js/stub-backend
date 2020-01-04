
const Data = require('./../../shared/read-db-files');
const ScenarioBase = require('../../shared/bases/scenario-base');

/**
 * @description Deal with the data related to a POST method.
 */
class PostRespository extends ScenarioBase {
  /**
   * @description Find all scenarios for a specific request.
   * @param {object} request Request.
   * @return {object} Returns all the scenarios fot POST method
   */
  findData(request) {
    return this.provideScenarios(request, Data.dbByMethod('_post'));
  }
}
module.exports = new PostRespository();
