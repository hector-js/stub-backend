export const getTemplate = (endpoint, headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });
  }
  return `{
  "_get" : {
    "${endpoint}" : [
      {
        "_body" : { "body" : "To be defined" },
        "_headers" : [ ${headersCustom.slice(0, -1)} ],
        "status_" : 0,
        "_cookies" : [],
        "description_" : "Description to be defined"
      }
    ]
  }
}`;
};
