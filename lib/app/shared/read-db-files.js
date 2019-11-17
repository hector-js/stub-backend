
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');


const GET_ID= '_get';
const POST_ID= '_post';
const DELETE_ID= '_delete';
const PUT_ID= '_put';
const PATCH_ID= '_patch';
const HEAD_ID= '_head';

// TODO: This code can be refactored
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
    let dbDelete = {};
    let dbPut = {};
    let dbPatch = {};
    let dbHead = {};
    fs.readdirSync('./' + pathDb.to).forEach((file) => {
      const obj = require(relativePath + '/' + file);
      const get =obj[GET_ID];
      const post =obj[POST_ID];
      const del =obj[DELETE_ID];
      const put =obj[PUT_ID];
      const patch =obj[PATCH_ID];
      const head =obj[HEAD_ID];
      if (get) {
        dbGet = Object.assign(dbGet, get);
      }
      if (post) {
        dbPost = Object.assign(dbGet, post);
      }
      if (del) {
        dbDelete = Object.assign(dbDelete, del);
      }
      if (put) {
        dbPut = Object.assign(dbPut, put);
      }
      if (patch) {
        dbPatch = Object.assign(dbPatch, patch);
      }
      if (head) {
        dbHead = Object.assign(dbHead, head);
      }
    });
    db[GET_ID] = dbGet;
    db[POST_ID] = dbPost;
    db[DELETE_ID] = dbDelete;
    db[PUT_ID] = dbPut;
    db[PATCH_ID] = dbPatch;
    db[HEAD_ID] = dbHead;
    return db;
  }
};
