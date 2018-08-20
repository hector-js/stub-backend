const utils = require('./../config/utils');

module.exports = {
    handleGetRequest(req, res, next, db) {
        const segmentsUrl = req.url.split('/');
        const identifier = segmentsUrl.pop();
        var idFound = false;
        contextPath = db[segmentsUrl.pop()];
        if (!contextPath) {
            res.sendStatus(400);
        } else {
            for (j in contextPath) {
                if (contextPath[j].id === identifier) {
                    idFound = true;
                    if (mockStatus(contextPath[j])) {
                        res.sendStatus(mockStatus(contextPath[j]))
                        break;
                    }
                    if (securityCheck(contextPath[j], req)) {
                        res.sendStatus(401)
                        break;
                    }
                    next()
                    break;
                }
            }
        }
        return idFound;
    }
}

const securityCheck = (contextPath, req) => {
    return contextPath.auth_ && utils.isNotAuthorized(req.get('Authorization'));
}

const mockStatus = (contextPath) => {
    return contextPath.status_;
}
