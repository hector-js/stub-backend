import { 
  convertIdsToJsonProperties,
  convertHeadersToJsonProperties,
  getHeaders,
  getStatus
} from "../../utils.cli";

export const traceTemplate = (args, idsFormatted) => {
  let path = args._[2];
  const headers = getHeaders(args);
  const status = getStatus(args);
  
  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `{
  "_get" : {
    "${path}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_headers" : [ ${convertHeadersToJsonProperties(headers)} ],
        ${status ? `"_status": ${status},` : ''}
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
