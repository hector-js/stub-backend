
const environment = require('./../../environment/index');
const path = require('path');
const fs = require('fs');

module.exports = class Data {
    static db() {
        const relativePath = path.relative(environment.pathDb.from, environment.pathDb.to);
        var db = {};
        fs.readdirSync('./' + environment.pathDb.to).forEach(file => {
            db = Object.assign(db, require(relativePath + '/' + file));
        });
        return db;
    }
}
