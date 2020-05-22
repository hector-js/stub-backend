
module.exports = function retryOps(req, scenario) {

    if (!scenario._retry || scenario._retry === 0) {
        return scenario._res;
    }

    const uniqueId = createID(req, scenario);
    const tempFiles = require('./../../../test/unit/data/temp.json');
    const numberMatches = tempFiles.ids.filter((id) => id === uniqueId).length;

    return scenario._resRetry[numberMatches - 1];
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

