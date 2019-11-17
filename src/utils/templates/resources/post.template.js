export const postTemplate = (endpoint, headers, idsFormatted) => {

  if(endpoint.charAt(0)!== '/'){
    endpoint = `/${endpoint}`;
  }
  return `{
  "_post" : {
    "${endpoint}" : [
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


const convertIdsToJsonProperties = (idsFormatted) => {
  var ids = '';
  if (idsFormatted) {
    idsFormatted.forEach(id => {
      ids = ids + `"_${id}": "${id}TBD", `;
    });
  }
  return ids;
}

const convertHeadersToJsonProperties = (headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });

    headersCustom.slice(0, -1);
  }
  return headersCustom;
}

