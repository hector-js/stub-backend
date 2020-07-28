/**
 * Check if request object has object keys
 * @param {object} _obj object
 * @param {object} req request object
 * @return {boolean} Return true if request object has keys
 */
function hasObjectKeys(_obj, req) {
  let flag = true;
  Object.keys(_obj).forEach((key) => {
    const value = _obj[key];
    const hasElement =
      !!req[key.toLowerCase()] && req[key.toLowerCase()] === value;
    flag = flag && hasElement;
  });
  return flag;
}

/**
 * Check if is object
 * @param {object} obj object
 * @return {boolean} Return true if it is an object
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

module.exports = { isObject, hasObjectKeys };
