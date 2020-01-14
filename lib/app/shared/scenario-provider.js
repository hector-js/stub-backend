
const negaBodies = require('../utils/constants/negative-bodies');
const DBUtils = require('../utils/db-utils');
const parser = require('fast-xml-parser');

module.exports = class ScenarioProvider {
  /**
   * @param {object} url Request url.
   * @param {object} db all the posible responses for a request.
   */
  constructor(url, db) {
    this.url = url;
    this.db = db;
  }

  /**
   * Returns the endpoint which matchs with the request url.
   * @return {string} i.e. /whatever/{id}/bla/bla?product={param}.
   */
  isInDB() {
    const elementsUri = DBUtils.splitURI(this.url);
    let endpointSelected;

    const endpointsDB = [];
    for (const i in this.db) {
      if (Object.prototype.hasOwnProperty.call(this.db, i)) {
        endpointsDB.push(i);
      }
    }
    endpointsDB.forEach((endpoint) => {
      const counterIDs = (endpoint.match(new RegExp('{', 'g')) || []).length;

      const endpointBroken = DBUtils.splitURI(endpoint);
      const lengthEndpoint = endpointBroken.length;

      if (lengthEndpoint === elementsUri.length) {
        const j = endpointBroken.filter((value, index) => value === elementsUri[index]).length;
        if (j === (lengthEndpoint - counterIDs)) {
          endpointSelected = endpoint;
        }
      }
    });
    return endpointSelected;
  }

  /**
   * Returns Information by Path.
   * @param {string} path Context path of get method.
   * @return {object} { hasResult: true/false, contextPath: "-", id:"-"}.
   */
  getScenario(path) {
    const scenarios = this.db[path];
    if (!Array.isArray(scenarios)) {
      return negaBodies.badSource;
    }

    const filteredByIds = this.filteredByIds(scenarios, path);

    const xmlCheckFn = (value) => !!value['_xml'];
    const filtered = filteredByIds.some(xmlCheckFn) ?
      filteredByIds.filter(xmlCheckFn) : filteredByIds;

    const numberScenarios = filtered.length;
    if (numberScenarios > 1) {
      return negaBodies.multipleScenarios;
    }
    if (numberScenarios < 1) {
      return negaBodies.notFound;
    }
    return filtered[0];
  }

  /**
   * Get scenarios macthing with the path.
   * @param {string} path Context path of get method.
   * @return {object} { hasResult: true/false, contextPath: "-", id:"-"}.
   */
  getScenarios(path) {
    const scenarios = this.db[path];
    if (!Array.isArray(scenarios)) {
      return negaBodies.badSource;
    }
    const filteredByIds = this.filteredByIds(scenarios, path);
    const xmlCheckFn = (value) => !!value['_xml'];
    const filtered = filteredByIds.some(xmlCheckFn) ?
      filteredByIds.filter(xmlCheckFn) : filteredByIds;

    if (filtered.length < 1) {
      return negaBodies.notFound;
    }
    return filtered;
  }

  /**
   * Returns a response with the same request than the scenario.
   * @param {object} req  Request.
   * @param {object} scenarios Scenarios to compare.
   * @return {object} Response.
   */
  filterByRequest(req, scenarios) {
    const body = req.body;
    const scenario = scenarios.find((sce) =>
      isJson(body) ?
        DBUtils.compareJSON(sce['_requestBody'], body, sce['_excludeBodyFields']) :
        DBUtils.compareXML(sce['_requestBody'], body.toString()));

    if (!scenario) {
      const noReqBodyScenarios = scenarios.filter((s) => !s['_requestBody']);
      if (!noReqBodyScenarios || noReqBodyScenarios.length === 0) {
        return negaBodies.notRequestFound;
      } else if (noReqBodyScenarios.length === 1) {
        return noReqBodyScenarios[0];
      } else {
        return negaBodies.multipleScenarios;
      }
    } else {
      return scenario;
    }
  }

  /**
   * It returns scenarios filtered by ids.
   * @param {object} scenarios all the posible scenarios.
   * @param {string} path
   * @return {object} Response.
   */
  filteredByIds(scenarios, path) {
    const arraKeyVal = this.getKeyValueUri(path);
    return scenarios.filter((value) => {
      let isPassing = true;
      arraKeyVal.forEach((obj) => {
        const keyId = Object.keys(obj)[0];
        const hasScenarioId = value[keyId];
        isPassing = isPassing && hasScenarioId && DBUtils.isEq(hasScenarioId, obj[keyId]);
      });
      return isPassing;
    });
  }

  /**
   * Returns Information by Path.
   * @example
   *        - url: /customer/123/value?prod=AAA
   *        - endpointTemplate: /customer/{id}/value?prod={para}
   *        - Result: [{_id:'123'},{_para:'AAA'}]
   * @param {string} endpointTemplate Context path of get method.
   * @return {object} [{ _id:'whatever'}].
   */
  getKeyValueUri(endpointTemplate) {
    const keyValuUri = [];
    const arrayTempl = DBUtils.splitURI(endpointTemplate);
    const arrayUrl = DBUtils.splitURI(this.url);
    arrayTempl.forEach((value, index) => {
      if (value !== arrayUrl[index]) {
        const obj = {};
        const sanitize = DBUtils.getIdFormat(value);
        obj[sanitize] = arrayUrl[index];
        keyValuUri.push(obj);
      }
    });

    return keyValuUri;
  }
};

/**
* Check json or xml.
* @param {string} str request.
* @return {boolean} Return an array of scenarios.
*/
function isJson(str) {
  if (parser.validate(str.toString()) === true) {
    return false;
  }
  try {
    JSON.parse(JSON.stringify(str));
  } catch (e) {
    return false;
  }
  return true;
}

