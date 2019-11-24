import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const traceTemplate = (endpoint, args, idsFormatted) => {
  
  let headers = getHeaders(args);
  
  if (endpoint.charAt(0) !== '/') {
    endpoint = `/${endpoint}`;
  }
  return `{
  "_get" : {
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
