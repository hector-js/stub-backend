import {
  convertIdsToJsonProperties,
  convertArrayToJsonProperties,
  getHeaders,
  getStatus,
  getCookies
} from "../../utils.cli";

export const postTemplate = (args, idsFormatted) => {
  let path = args._[2];
  let headers = getHeaders(args);
  let status = getStatus(args);
  let cookies = getCookies(args);

  if(path.charAt(0)!== '/'){
    path = `/${path}`;
  }
  return `{
  "_post" : {
    "${path}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_requestBody":{
          "dummy": "dummy"
        },
        "_body" : { "dummyResponse": "dummyResponse" },
        "_headers" : [ ${convertArrayToJsonProperties(headers)} ],
        ${status ? `"_status": ${status},` : ''}
        "_cookies" : [ ${convertArrayToJsonProperties(cookies)} ],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
