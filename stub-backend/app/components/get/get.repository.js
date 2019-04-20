
const environment = require('../../../environment/index')
const pathRepDb = environment.pathRepDb ? './.' + environment.pathRepDb : './../../../config/db.json';
const db = require(pathRepDb);
const ContextMatcher = require('./../../utils/context-matcher');

class GetRespository {
    findData(path) {
        var regexArray = [];
        for (let i in db) {
            regexArray.push(i);
        }
        const result = ContextMatcher.getIdByContextPath(path, regexArray);

        if (result.hasResult) {
            const cases = db[result.contextPath];
            const res = cases.filter(x => x['id_'] ? isEq(x['id_'], result.id) : false);

            return res.length === 1 ? res[0] : null;
        }
        return null;
    }
}

module.exports = new GetRespository();


const isEq = (stringOne, stringTwo) => {
    return stringOne.toUpperCase() === stringTwo.toUpperCase();
}
