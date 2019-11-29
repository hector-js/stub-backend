import { 
  convertIdsToJsonProperties,
  convertHeadersToJsonProperties,
  getHeaders,
  getStatus
} from "../../utils.cli";

export const putTemplate = (args, idsFormatted) => {
  let path = args._[2];
  const headers = getHeaders(args);
  const status = getStatus(args);

  if(path.charAt(0)!== '/'){
    path = `/${path}`;
  }
  return `{
  "_put" : {
    "${path}" : [
      {
        ${convertIdsToJsonProperties(idsFormatted)}
        "_requestBody":{
          "dummy": "dummy"
        },
        "_body" : { "dummyResponse": "dummyResponse" },
        "_headers" : [ ${convertHeadersToJsonProperties(headers)} ],
        ${status ? `"_status": ${status},` : ''}
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
