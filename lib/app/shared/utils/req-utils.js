
module.exports = class ReqUtils {
  /**
   * Adds two numbers together.
   * @param {Array} _headers Array of headers in the request.
   * @param {object} req Request.
   * @return {boolean} Return true if the request has not header in the request.
   */
  static hasNotHeaders(_headers, req) {
    let flag = true;
    for (const i in _headers) {
      if (Object.prototype.hasOwnProperty.call(_headers, i)) {
        flag = flag && req.get(_headers[i]);
      }
    }
    return !flag;
  }

  /**
   * Adds two numbers together.
   * @param {Array} _cookies Cookies to check.
   * @param {object} cookies Cookies in the request.
   * @return {boolean} Return true if the request has not specific
   * cookies in the request.
   */
  static hasNotCookies(_cookies, cookies) {
    if (!cookies) {
      return true;
    }

    let flag = true;

    for (const i in _cookies) {
      if (Object.prototype.hasOwnProperty.call(_cookies, i)) {
        flag = flag && cookies[_cookies[i]];
      }
    }
    return !flag;
  }
};
