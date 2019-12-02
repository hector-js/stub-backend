module.exports = dbXML = {
  '/xml': [
    {
      _id: 'juan',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>Whatever</name></title></xml>',
    },
    {
      _id: 'juan',
      _headers: [],
      _requestBody: {
        data: 'data2',
      },
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/xml2/{id}/data': [
    {
      _id: 'juan',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>juan</name></title></xml>',
    },
    {
      _id: 'pedro',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>pedro</name></title></xml>',
    },
  ],
  '/xml/{id}/xml': [
    {
      _id: 'lucas',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>Lucas1</name></title></xml>',
    },
    {
      _id: 'pedro',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>pedro</name></title></xml>',
    },
    {
      _id: 'pedro',
      _headers: [],
      _body: '<xml><title><name>pedro</name></title></xml>',
    },
    {
      _id: 'juan',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>pedro</name></title></xml>',
    },
    {
      _id: 'lucas',
      _headers: [],
      _body: '<xml><title><name>Lucas2</name></title></xml>',
    },
    {
      _id: 'lucas',
      _headers: [],
      _xml: true,
      _body: '<xml><title><name>Lucas3</name></title></xml>',
    },
  ],
};
