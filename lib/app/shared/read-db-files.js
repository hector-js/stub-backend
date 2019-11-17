
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
    const db = {};
    let dbGet ={};
    let dbPost = {};
    fs.readdirSync('./' + pathDb.to).forEach((file) => {
      const obj = require(relativePath + '/' + file);
      const get =obj['_get'];
      const post =obj['_post'];
      if (get) {
        dbGet = Object.assign(dbGet, get);
      }
      if (post) {
        dbPost = Object.assign(dbGet, post);
      }
    });
    db['_get'] = dbGet;
    db['_post'] = dbPost;
    return db;
  }
};
