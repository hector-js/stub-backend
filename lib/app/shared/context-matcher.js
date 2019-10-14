
module.exports = class ContextMatcher {
    static getIdByContextPath(contextPath, regexArray) {

        var regexFiltered = regexArray.filter(value => new RegExp(value).test(contextPath));

        const regexDust = this.identifySimilarContextPathWithRegex(contextPath, regexFiltered);

        const regex = this.sanitize(contextPath, regexDust);

        return {
            hasResult: regex.length === 1 ? true : false,
            contextPath: regex.length === 1 ? regex[0] : null,
            id: regex.length === 1 ? new RegExp(regex[0]).exec(contextPath)[1] : null
        };
    }

    static identifySimilarContextPathWithRegex(contextPath, regex){
        const regexNew = regex.filter(element=> new RegExp(element).test(contextPath));
        return regexNew.length === 0? regex: regexNew; 
    }

    static sanitize(contextPath, regex){
        var arrayTo = [];
        arrayTo.push(...regex);

        for(var i = 0 ; i < regex.length ; i++){
            for(var j = 0 ; j < regex.length ; j++){
                if(isRegexCompatibleWithOtherRegex( regex[j ], regex[i] )) {
                    arrayTo.splice(j);
                }
            }
        }
        return arrayTo; 
    }
}

const isRegexCompatibleWithOtherRegex = (regOne, regTwo)=> new RegExp(regOne).test(regTwo) && regTwo !== regOne;

