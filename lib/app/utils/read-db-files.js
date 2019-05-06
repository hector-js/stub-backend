
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');

module.exports = class Data {
    static db() {
        const relativePath = path.relative('/app/utils/read-db-files', environment.pathRepDb);
        var db = {};
        fs.readdirSync('./' + environment.pathRepDb).forEach(file => {
            db = Object.assign(db, require(relativePath + '/' + file));
        });
        return db;
    }
}
