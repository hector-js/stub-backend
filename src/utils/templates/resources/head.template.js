import { 
  convertIdsToJsonProperties,
  convertHeadersToJsonProperties,
  getHeaders,
  getStatus
} from "../../utils.cli";

export const headTemplate = (args, idsFormatted) => {
  let path = args._[2];
  let headers = getHeaders(args);
  let status = getStatus(args);
  
  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `{
  "_head" : {
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
