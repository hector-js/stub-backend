export const getTemplate = (endpoint, headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });
  }
  return `{
  "${endpoint}" : [
    {
      "body_" : { "body" : "To be defined" },
      "headers_" : [ ${headersCustom.slice(0, -1)} ],
      "status_" : 0,
      "cookies_" : [],
      "description_" : "Description to be defined"
    }
  ]
}`;
};
