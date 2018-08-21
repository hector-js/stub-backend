const utils = require('./../../config/utils');

module.exports = {
    handlePostRequest(req, res, next, db) {
        const context = db[req.url.split('/').pop()];
        var idFound = false;
        if (!context) {
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
