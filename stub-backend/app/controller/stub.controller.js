const getService = require("./../../app/service/get-service");
const postService = require("./../../app/service/post-service");
// const environment = require('./../../environment/index');
// const pathToDb = environment.pathDb || './../../config/db.json';
// const db = require(pathToDb);

module.exports = {
    handleRequest(req, res, next, db){
        var idFound;
        switch (req.method) {
            case 'GET':
                idFound = getService.handleGetRequest(req, res, next, db);
                break;
            case 'POST':
                idFound = postService.handleGetRequest(req, res, next, db);
                break;
            case 'PUT':
            case 'DELETE':
            default:
        }
        if (!idFound) {
            res.sendStatus(404);
        }
    } 
}