
module.exports = class ReqUtils {
    static hasNotHeaders(headers_, req) {
        let flag = true;
        for (let i in headers_) {
            flag = flag && req.get(headers_[i]);
        }
        return !flag;
    }

    static hasNotCookies(cookies_, cookies) {
        if (!cookies) { return true }

        let flag = true;

        for (let i in cookies_) {
            flag = flag && cookies[cookies_[i]];
        }
        return !flag;
    }
}
