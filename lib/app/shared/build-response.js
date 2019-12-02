module.exports = buildResponse = (res, response, hasXml) => {
  res.status(response.status);
  if (hasXml) {
    res.header('Content-Type', 'text/xml').send(response.body);
  } else {
    res.json(response.body);
  }
};
