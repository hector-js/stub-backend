const environment = require('../environment/index');
module.exports = {
    isNotAuthorized(token) {
        return token !== environment.token;
    }
}
