import { buildUrl } from "../../utils.cli";

export function methodReq(method, args, idsFormatted){
    let path = args._[2];
    const pathWithDummyData = buildUrl(path, idsFormatted);
    return `\n      .${method}('${path.startsWith('/') ? pathWithDummyData : '/' + pathWithDummyData}')`;
}
