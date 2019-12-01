import { getHeaders, arrayToJson } from "../../utils.cli";

export function headers(args){
    const headers = getHeaders(args);
    return `\n      ${headers ? `.set({${arrayToJson(headers)}})` : ''}`;
}
