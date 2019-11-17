
const negaBodies = require('./negative-bodies');

module.exports = class ContextMatcher {
  /**
   * @param {object} url Request.
   * @param {object} db data.
   */
  constructor(url, db) {
    this.url = url;
    this.db = db;
  }

  /**
   * Returns Information by Path.
   * @param {string} path Context path of get method.
   * @param {arrayTo} regexs Array of posible regex to check.
   * @return {boolean} { hasResult: true/false, contextPath: "-", id:"-"}.
   */
  isInDB() {
    const elementsUri = this.splitURI(this.url);
    let endpointSelected;

    const endpointsDB = [];
    for (const i in this.db) {
      if (Object.prototype.hasOwnProperty.call(this.db, i)) {
        endpointsDB.push(i);
      }
    }
    endpointsDB.forEach((endpoint) => {
      const counterIDs = (endpoint.match(new RegExp('{', 'g')) || []).length;

      const endpointBroken = this.splitURI(endpoint);
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
    const arraKeyVal = this.getKeyValueUri(path);
    const filteredByIds = scenarios.filter((value) => {
      let isPassing = true;
      arraKeyVal.forEach((obj) => {
        const keyId = Object.keys(obj)[0];
        const hasScenarioId = value[keyId];
        isPassing = isPassing && hasScenarioId && this.isEq(hasScenarioId, obj[keyId]);
      });
      return isPassing;
    });

    const numberScenarios = filteredByIds.length;
    if (numberScenarios > 1) {
      return negaBodies.multipleScenarios;
    }
    if (numberScenarios < 1) {
      return negaBodies.notFound;
    }
    return filteredByIds[0];
  }

  /**
   * Returns Information by Path.
   * @param {string} endpointTemplate Context path of get method.
   * @return {object} [{ _id:'whatever'}].
   */
  getKeyValueUri(endpointTemplate) {
    const keyValuUri = [];
    const arrayTempl = this.splitURI(endpointTemplate);
    const arrayUrl = this.splitURI(this.url);
    arrayTempl.forEach((value, index) => {
      if (value !== arrayUrl[index]) {
        const obj = {};
        const sanitize = this.getIdFormat(value);
        obj[sanitize] = arrayUrl[index];
        keyValuUri.push(obj);
      }
    });

    return keyValuUri;
  }

  /**
   * Returns Path split by /, &, ? and =.
   * @param {string} template Template. i.e. /part1/{id}
   * @return {arrayTo} array.
   */
  splitURI(template) {
    return template.split(/[\/?=&]+/);
  }

  /**
   * Format identifier
   * @param {string} templa Template. i.e. {id}
   * @return {string} format id.
   */
  getIdFormat(templa) {
    return `_${templa.replace(/{|}/g, '')}`;
  }

  /**
   * Compare ignoring cases
   * @param {string} stringOne
   * @param {string} stringTwo
   * @return {boolean} format id.
   */
  isEq(stringOne, stringTwo) {
    return stringOne.toUpperCase() === stringTwo.toUpperCase();
  };
};
