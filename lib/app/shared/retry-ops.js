const fs = require('fs');

const root = 'temp/';
const relativePath = root + 'temp.json';

module.exports = function retryOps(req, scenario, path) {
  if (!scenario._retry || scenario._retry === 0) {
    return scenario._res;
  }

  let requestTracker = checkPath(path + relativePath) ? readFile(path) : createTempFile(path);

  const uniqueId = createID(req, scenario);
  const numberMatches = requestTracker.ids.filter((id) => id === uniqueId).length;

  if (numberMatches === scenario._retry) {
    requestTracker = { ids: requestTracker.ids.filter((id) => id !== uniqueId) };
  } else {
    requestTracker.ids.push(uniqueId);
  }
  fs.writeFileSync(path + relativePath, JSON.stringify(requestTracker, null, 2));

  return numberMatches > 0 ? scenario._resRetry[numberMatches - 1] : scenario._res;
};

/**
 * @return {number} identifier
 * @param {object} scenario
 */
function createNumber(scenario) {
  const text = JSON.stringify(scenario);
  let i = 0;
  let count = 0;
  for (i = 0; i < text.length; i++) {
    count = count + text.charCodeAt(i);
  }
  return count;
}

/**
 * @param {object} req
 * @param {object} scenario
 * @return {string} uniqueId
 */
function createID(req, scenario) {
  const method = req.method;
  const pathFormatted = req.path.replace(/\/|\?|\=|\&/g, '');
  const uniqueId = createNumber(scenario);
  return `${method}-${pathFormatted}-${uniqueId}`;
}

/**
 * @param {string} path
 * @return {boolean} result path exist
 */
const checkPath = (path) => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    return false;
  }
};

/**
 * @param {string} path
 * @return {object} temporary object
 */
const createTempFile = (path) => {
  const dir = path + root;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const requestSHistory = { ids: [] };
  fs.writeFileSync(path + relativePath, JSON.stringify(requestSHistory, null, 2));
  return requestSHistory;
};

/**
 * @param {string} path
 * @return {object} temporary object
 */
const readFile = (path) => {
  return JSON.parse(fs.readFileSync(path + relativePath).toString());
};

