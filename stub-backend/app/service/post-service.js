const utils = require('./../../config/utils');
const repository = require('./../repository/respones.repository');

module.exports = {
    handlePostRequest(context) {
        var req = context.request;
        var res = context.response;
        var next = context.fn;
        
        const contextUrl = repository.findData(req.url.split('/').pop());

        var idFound = false;
        if (!contextUrl) {
            res.sendStatus(400);
        } else {
            idFound = true;
            const token = req.get('Authorization')
            if (token && utils.isNotAuthorized(token)) {
                res.sendStatus(401)
            } else {
                next();
            }
        }
        return idFound;
    }
}
