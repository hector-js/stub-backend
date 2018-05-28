const environment = require('./environment.local');
module.exports = {
    isNotAuthorized(token) {
        return token !== environment.token;
    }
}
