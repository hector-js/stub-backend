import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const headTemplate = (endpoint, args, idsFormatted) => {
  
  let headers = getHeaders(args);
  
  if (endpoint.charAt(0) !== '/') {
    endpoint = `/${endpoint}`;
  }
  return `{
  "_head" : {
    "${endpoint}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_headers" : [ ${convertHeadersToJsonProperties(headers)} ],
        "_status" : 0,
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
