
module.exports = class ReqUtils {
  /**
   * Adds two numbers together.
   * @param {Array} headers_ Array of headers in the request.
   * @param {object} req Request.
   * @return {boolean} Return true if the request has not header in the request.
   */
  static hasNotHeaders(headers_, req) {
    let flag = true;
    for (const i in headers_) {
      if (Object.prototype.hasOwnProperty.call(headers_, i)) {
        flag = flag && req.get(headers_[i]);
      }
    }
    return !flag;
  }

  /**
   * Adds two numbers together.
   * @param {Array} cookies_ Cookies to check.
   * @param {object} cookies Cookies in the request.
   * @return {boolean} Return true if the request has not specific
   * cookies in the request.
   */
  static hasNotCookies(cookies_, cookies) {
    if (!cookies) {
      return true;
    }

    let flag = true;

    for (const i in cookies_) {
      if (Object.prototype.hasOwnProperty.call(cookies_, i)) {
        flag = flag && cookies[cookies_[i]];
      }
    }
    return !flag;
  }
};
