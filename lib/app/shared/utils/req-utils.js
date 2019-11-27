
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
   * @param {object} cookiesReq Cookies in the request.
   * @return {boolean} Return true if the request has not specific
   * cookies in the request.
   */
  static hasInvalidCookies(_cookies, cookiesReq) {
    if (!cookiesReq || !_cookies || _cookies.length === 0) {
      return false;
    }

    let flag = true;

    _cookies.forEach((cookie) => {
      if ((typeof cookie) === 'string') {
        flag = flag && cookiesReq[cookie];
      } else {
        const key = Object.keys(cookie)[0];
        const value = cookie[key];
        const hasCookie = !!cookiesReq[key] && cookiesReq[key] === value;
        flag = flag && hasCookie;
      }
    });
    return !flag;
  }
};
