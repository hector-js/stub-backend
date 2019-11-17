import { convertIdsToJsonProperties, convertHeadersToJsonProperties, getHeaders } from "../../utils.cli";

export const deleteTemplate = (args, idsFormatted) => {
  let path = args._[2];
  let headers = getHeaders(args);

  if(path.charAt(0)!== '/'){
    path = `/${path}`;
  }
  return `{
  "_delete" : {
    "${path}" : [
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
