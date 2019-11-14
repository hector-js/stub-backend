
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');

module.exports = class Data {
  /**
   * @return {object} Returns an entire object
   * with all the data under resources folder.
   */
  static db() {
    const pathDb = environment.pathDb;
    const relativePath = path.relative(pathDb.from, pathDb.to);
    let db = {};
    fs.readdirSync('./' + pathDb.to).forEach((file) => {
      db = Object.assign(db, require(relativePath + '/' + file));
    });
    return db;
  }
};
