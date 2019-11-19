import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const postTemplate = (endpoint, args, idsFormatted) => {

  let headers = getHeaders(args);

  if(endpoint.charAt(0)!== '/'){
    endpoint = `/${endpoint}`;
  }
  return `{
  "_post" : {
    "${endpoint}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_requestBody":{
          "dummy": "dummy"
        },
        "_body" : { "dummyResponse": "dummyResponse" },
        "_headers" : [ ${convertHeadersToJsonProperties(headers)} ],
        "_status" : 0,
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
