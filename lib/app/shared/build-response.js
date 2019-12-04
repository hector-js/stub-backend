module.exports = buildResponse = (res, response, hasXml) => {
  res.status(response.status);
  if (hasXml) {
    res.header('Content-Type', 'text/xml; charset=utf-8').send(response.body);
  } else {
    res.json(response.body);
  }
};
