import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const getTemplate = (args, idsFormatted) => {
  let path = args._[2];
  let headers = getHeaders(args);
  
  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `{
  "_get" : {
    "${path}" : [
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
