
module.exports = class ContextMatcher {
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
    const regexNew = regexsFiltered.filter((el)=> new RegExp(el).test(path));
    return regexNew.length === 0? regexsFiltered: regexNew;
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
        if (areComp( regexs[j], regexs[i] )) {
          arrayTo.splice(j);
        }
      }
    }
    return arrayTo;
  }
};

const areComp = (reg1, reg2)=> new RegExp(reg1).test(reg2) && reg2 !== reg1;

