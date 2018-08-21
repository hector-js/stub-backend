
const environment = require('./../../environment/index')
const pathRepDb = environment.pathRepDb || './../../config/db.json';
const db = require(pathRepDb);

module.exports = {
    findData(path) {
        return db[path];
    }
}

