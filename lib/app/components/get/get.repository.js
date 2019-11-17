
const Data = require('./../../shared/read-db-files');
const ContextMatcher = require('./../../shared/context-matcher');
const negaBodies = require('./../../shared/negative-bodies');

/**
 * Get data from the json files under resources folder.
 */
class GetRespository {
  /**
   * Find data for a specific request.
   * @param {string} path2 Path coming from the request.
   * @return {object} Returns the data for that specific request.
   */
  findData(path2) {
    const db = Data.db();
    const contextMatcher = new ContextMatcher(path2, db['_get']);
    const endpoint = contextMatcher.isInDB();
    return endpoint?contextMatcher.getScenario(endpoint): negaBodies.notFound;
  }
}
module.exports = new GetRespository();
