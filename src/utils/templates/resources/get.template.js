import {
  convertIdsToJsonProperties,
  convertArrayToJsonProperties,
  getHeaders,
  getStatus,
  getCookies
} from "../../utils.cli";

export const getTemplate = (args, idsFormatted) => {
  let path = args._[2];
  let headers = getHeaders(args);
  let cookies = getCookies(args);
  let status = getStatus(args);
  const description = args.description;

  if (path.charAt(0) !== '/') {
    path = `/${path}`;
  }
  return `{
  "_get" : {
    "${path}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_body" : { "body" : "To be defined" },
        "_headers" : [ ${convertArrayToJsonProperties(headers)} ],
        ${status ? `"_status": ${status},` : ''}
        "_cookies" : [ ${convertArrayToJsonProperties(cookies)} ],
        "_description" : "${description ? description : 'Description to be defined'}"
      }
    ]
  }
}`;
};
