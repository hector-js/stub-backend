
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

    const regexArray = [];
    for (const i in db) {
      if (Object.prototype.hasOwnProperty.call(db, i)) {
        regexArray.push(i);
      }
    }
    const result = ContextMatcher.getIdByPath(path2, regexArray);
    if (result.hasResult) {
      const cases = db[result.contextPath];
      if (Array.isArray(cases)) {
        const res = cases.filter((x) => checkById(x['id_'], result.id));
        if (res.length === 0) {
          return db[result.contextPath][0];
        }
        return res.length === 1 ? res[0] : null;
      } else {
        return negaBodies.badSource;
      }
    }
    return negaBodies.notFound;
  }
}
module.exports = new GetRespository();

const isEq = (stringOne, stringTwo) => {
  return stringOne.toUpperCase() === stringTwo.toUpperCase();
};

const checkById = (id_, id)=>{
  return id_ ? isEq(id_, id) : false;
};
