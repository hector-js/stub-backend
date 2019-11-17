
const Data = require('./../../shared/read-db-files');

/**
 * Get data from the json files under resources folder.
 */
class PostRespository {
  /**
   * Find Data for a specific request.
   * @param {object} body Body coming from the request.
   * @return {object} Returns the data for that specific request.
   */
  findData(body) {
    const requests = Data.db()['_post'];
    for (const i in requests) {
      if (compare(requests[i].data, body)) {
        return requests[i];
      }
    }
    return null;
  }
}
module.exports = new PostRespository();


const compare = (jsonA, jsonB) => {
  return [...new Set([...Object.keys(jsonA), ...Object.keys(jsonB)])]
      .every((k) => k in jsonA && k in jsonB && jsonA[k] === jsonB[k]);
};
