
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
    const elementsUri = this.url.split(/[\/?=&]+/);
    let endpointSelected;

    const endpointsDB = [];
    for (const i in this.db) {
      if (Object.prototype.hasOwnProperty.call(this.db, i)) {
        endpointsDB.push(i);
      }
    }
    endpointsDB.forEach((endpoint) => {
      let i = 0;
      let j = 0;

      const counterIDs = (endpoint.match(new RegExp('{', 'g')) || []).length;

      const endpointBroken = endpoint.split(/[\/?=&]+/);
      const lengthEndpoint = endpointBroken.length;

      if (lengthEndpoint === elementsUri.length) {
        for (i = 0; i < lengthEndpoint; i++) {
          if (endpointBroken[i] === elementsUri[i]) {
            j++;
          }
        }
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
    // detect identifier
    let array = path.match(/\{(.*?)\}/g);
    array = array.map((val)=>`_${val.replace(/{|}/g, '')}`);



    console.log('array: ', array);
    console.log('scenarios: ', scenarios);

    // check variable to find
    const scenariosFound = scenarios.filter((scenario)=>!!scenario[array[0]]);
    console.log('scenario: ',scenariosFound )
    
    const identifierPath = 'mark';
    const scenarionById = scenariosFound.filter( (sce) => sce[array[0]] ===identifierPath);
    console.log('scenario: ',scenarionById )
    // return path
    return null;
  }

  /**
   * Returns Information by Path.
   * @param {string} path Context path of get method.
   * @param {arrayTo} regexs Array of posible regex to check.
   * @return {object} { hasResult: true/false, contextPath: "-", id:"-"}.
   */
  static getIdByPath(path, regexs) {
    const filRegx = regexs.filter((val) => new RegExp(val).test(path));
    const regexDust = this.identifySimilarPathWithRegex(path, filRegx);
    const regex = this.sanitize(regexDust);

    return {
      hasResult: regex.length === 1 ? true : false,
      contextPath: regex.length === 1 ? regex[0] : null,
      id: regex.length === 1 ? new RegExp(regex[0]).exec(path)[1] : null,
    };
  }

  /**
   * Adds two numbers together.
   * @param {string} path Path.
   * @param {arrayTo} regexsFiltered Regex to check.
   * @return {string} Regex identified.
   */
  static identifySimilarPathWithRegex(path, regexsFiltered) {
    const regexNew = regexsFiltered.filter((el) => new RegExp(el).test(path));
    return regexNew.length === 0 ? regexsFiltered : regexNew;
  }

  /**
   * Adds two numbers together.
   * @param {arrayTo} regexs Regexs to check compatibility.
   * @return {arrayTo} regex without any compatibility.
   */
  static sanitize(regexs) {
    const arrayTo = [];
    arrayTo.push(...regexs);

    for (let i = 0; i < regexs.length; i++) {
      for (let j = 0; j < regexs.length; j++) {
        if (areComp(regexs[j], regexs[i])) {
          arrayTo.splice(j);
        }
      }
    }
    return arrayTo;
  }
};

const areComp = (reg1, reg2) => new RegExp(reg1).test(reg2) && reg2 !== reg1;
