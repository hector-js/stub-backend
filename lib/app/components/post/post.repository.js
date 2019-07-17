
const Data = require('./../../shared/read-db-files');
const ContextMatcher = require('./../../shared/context-matcher');

class PostRespository {
    findData(body) {
        var requests = Data.db()['post_'];
        for (let i in requests) {
            if(compare(requests[i].data, body)){
                return requests[i];
            }
        }
        return null;
    }
}
module.exports = new PostRespository();


const compare = (jsonA, jsonB) => {
    return [...new Set([...Object.keys(jsonA), ...Object.keys(jsonB)])]
        .every(k => k in jsonA && k in jsonB && jsonA[k] === jsonB[k]);
}
