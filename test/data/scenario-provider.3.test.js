module.exports = dbXML = {
  '/xml': [
    {
      _req: {
        _id: 'juan',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>Whatever</name></title></xml>'

      }
    },
    {
      _req: {
        _id: 'juan',
        _headers: [],
        _body: {
          data: 'data2'
        }
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    }
  ],
  '/xml2/{id}/data': [
    {
      _req: {
        _id: 'juan',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>juan</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'pedro',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>pedro</name></title></xml>'
      }
    }
  ],
  '/xml/{id}/xml': [
    {
      _req: {
        _id: 'lucas',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>Lucas1</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'pedro',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>pedro</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'pedro',
        _headers: []
      },
      _res: {
        _body: '<xml><title><name>pedro</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'juan',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>pedro</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'lucas',
        _headers: []
      },
      _res: {
        _body: '<xml><title><name>Lucas2</name></title></xml>'
      }
    },
    {
      _req: {
        _id: 'lucas',
        _headers: []
      },
      _res: {
        _xml: true,
        _body: '<xml><title><name>Lucas3</name></title></xml>'
      }
    }
  ]
};
