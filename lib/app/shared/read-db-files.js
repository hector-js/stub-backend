
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');

const METHODS = [
  '_get',
  '_post',
  '_delete',
  '_put',
  '_patch',
  '_head'
];

module.exports = class Data {
  /**
   * @return {object} Returns a specific object
   * for one method.
   */
  static dbByMethod(method) {
    const pathDb = environment.pathDb;
    const relativePath = path.relative(pathDb.from, pathDb.to);
    const db = {};
    fs.readdirSync('./' + pathDb.to).forEach((file) => {
      const obj = require(relativePath + '/' + file);
      if (METHODS.find((ele) => ele === method) && obj[method]) {
        db[method] = Object.assign(db[method] ? db[method] : {}, obj[method]);
      }
    });

    return db[method];
  }

  /**
   * @return {object} Returns an entire object
   * with all the data under resources folder.
   */
  static db() {
    const pathDb = environment.pathDb;
    const relativePath = path.relative(pathDb.from, pathDb.to);
    const db = {};
    fs.readdirSync('./' + pathDb.to).forEach((file) => {
      const obj = require(relativePath + '/' + file);
      METHODS
        .filter((ele) => !!obj[ele])
        .forEach((ele) => db[ele] = Object.assign(db[ele] ? db[ele] : {}, obj[ele]));
    });
    return db;
  }
};
