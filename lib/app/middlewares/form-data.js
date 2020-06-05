const formidable = require('formidable');

const formDataParser = async (req, res, next) => {
  const formData = 'multipart/form-data';
  const urlencoded = 'application/x-www-form-urlencoded';
  const headers = req.headers;

  if (headers && headers['content-type']) {
    const contentType = headers['content-type'];

    if (contentType === urlencoded || contentType.includes(formData)) {
      const fields = await promisifyUpload(req);

      if (fields) {
        req.body = fields;
      }
    }
    if (contentType.includes(formData)) {
      req.headers['content-type'] = formData;
    }
  }

  next();
};

const promisifyUpload = (req) => new Promise((resolve, reject) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields) => {
    if (err) resolve();
    if (fields) resolve(fields);
    return resolve();
  });
});

module.exports = formDataParser;

