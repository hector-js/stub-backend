export const getTemplate = (endpoint, headers) => {
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
  "_get" : {
    "${endpoint}" : [
      {
        "_body" : { "body" : "To be defined" },
        "_headers" : [ ${headersCustom.slice(0, -1)} ],
        "_status" : 0,
        "_cookies" : [],
        "_description" : "Description to be defined"
      }
    ]
  }
}`;
};
