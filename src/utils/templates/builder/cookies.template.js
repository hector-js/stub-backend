import { getHeaders, arrayToJson, getCookies, arrayToArrayValues } from "../../utils.cli";

export function cookies(args){
    const cookies = getCookies(args);
    return `\n      ${cookies ? `.set('Cookie', [${arrayToArrayValues(cookies)}])` : ''}`;
}
