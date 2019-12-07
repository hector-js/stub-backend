import {
  convertIdsToJsonProperties,
  convertArrayToJsonProperties,
  getHeaders,
  getStatus,
  getCookies
} from "../../utils.cli";

export const traceTemplate = (args, idsFormatted) => {
  let path = args._[2];
  const headers = getHeaders(args);
  const status = getStatus(args);
  let cookies = getCookies(args);
  const description = args.description;

  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `{
  "_get" : {
    "${path}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_headers" : [ ${convertArrayToJsonProperties(headers)} ],
        ${status ? `"_status": ${status},` : ''}
        "_cookies" : [ ${convertArrayToJsonProperties(cookies)} ],
        "_description" : "${description ? description : 'Description to be defined'}"
      }
    ]
  }
}`;
};
