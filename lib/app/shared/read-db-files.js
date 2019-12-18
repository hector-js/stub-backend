
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');

const METHODS = [
  '_get',
  '_post',
  '_delete',
  '_put',
  '_patch',
  '_head',
];

module.exports = class Data {
  /**
   * @param {string} method kind of request method.
   * @return {object} Returns a specific object
   * for one method.
   */
  static dbByMethod(method) {
    const db = this.db();
    return db[method];
  }

  /**
   * @return {object} Returns an entire object
   * with all the data under resources folder.
   */
  static db() {
    const pathDb = environment.pathDb;
    const relativePath = path.relative(pathDb.from, pathDb.to);
    let db = {};

    const pathToResourcesAbs = path.resolve(path.relative(process.cwd(), __dirname), '../../' + pathDb.abs);
    const pathToResourceRel = './' + path.relative(process.cwd(), pathToResourcesAbs);
    fs.readdirSync(pathToResourceRel).forEach((file) => {
      let obj;
      try {
        obj = require(relativePath + '/' + file);
        METHODS
            .filter((ele) => !!obj[ele])
            .forEach((ele) => db[ele] = Object.assign(db[ele] ? db[ele] : {}, obj[ele]));
      } catch (e) {
        db = this.recur(pathToResourceRel + '/' + file, relativePath + '/' + file, db);
      }
    });
    return db;
  }

  /**
   * @param {string} path to resources file
   * @param {string} subfolder  path to the subfolder
   * @param {object} db  object to add all the files
   * @return {object} new object with the files in the subfolder
   */
  static recur(path, subfolder, db) {
    fs.readdirSync(path).forEach((file) => {
      let obj;
      try {
        obj = require(subfolder + '/' + file);
        METHODS
            .filter((ele) => !!obj[ele])
            .forEach((ele) => db[ele] = Object.assign(db[ele] ? db[ele] : {}, obj[ele]));
      } catch (e) {
        db = this.recur(path + '/' + file, subfolder + '/' + file, db);
      }
    });
    return db;
  }
};
