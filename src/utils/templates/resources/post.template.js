export const postTemplate = (endpoint, headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });
  }

  if(endpoint.charAt(0)!== '/'){
    endpoint = `/${endpoint}`;
  }
  return `{
  "_post" : {
    "${endpoint}" : [
      {
        "_requestBody":{
          "dummy": "dummy"
        },
        "_body" : { "dummyResponse": "dummyResponse" },
        "_headers" : [ ${headersCustom.slice(0, -1)} ],
        "status_" : 0,
        "_cookies" : [],
        "description_" : "Description to be defined"
      }
    ]
  }
}`;
};

