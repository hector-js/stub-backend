import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const getTemplate = (endpoint, args, idsFormatted) => {
  
  let headers = getHeaders(args);
  
  if (endpoint.charAt(0) !== '/') {
    endpoint = `/${endpoint}`;
  }
  return `{
  "_get" : {
    "${endpoint}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_body" : { "body" : "To be defined" },
        "_headers" : [ ${convertHeadersToJsonProperties(headers)} ],
        "_status" : 0,
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
