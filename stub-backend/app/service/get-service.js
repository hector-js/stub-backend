const utils = require('./../../config/utils');
const repository = require('./../repository/respones.repository');

module.exports = {
    handleGetRequest(context) {
        var req = context.request;
        var res = context.response;
        var next = context.fn;

        const segmentsUrl = req.url.split('/');
        const identifier = segmentsUrl.pop();
        var idFound = false;
        contextPath = repository.findData(segmentsUrl.pop());
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
