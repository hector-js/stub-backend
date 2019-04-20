
module.exports = class ContextMatcher {
    static getIdByContextPath(contextPath, regexArray) {
        const regex = regexArray.filter(value => new RegExp(value).test(contextPath));
        return {
            hasResult: regex.length === 1 ? true : false,
            contextPath: regex.length === 1 ? regex[0] : null,
            id: regex.length === 1 ? new RegExp(regex[0]).exec(contextPath)[1] : null
        };
    }
}
