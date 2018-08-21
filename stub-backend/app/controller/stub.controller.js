const getService = require("./../../app/service/get-service");
const postService = require("./../../app/service/post-service");

module.exports = {
    handleRequest(context){
        var req = context.request;
        var res = context.response;
        var idFound;
        switch (req.method) {
            case 'GET':
                idFound = getService.handleGetRequest(context);
                break;
            case 'POST':
                idFound = postService.handleGetRequest(context);
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