module.exports = dbPost8 = {
  '/edge-cases/validation/req': [
    {
      _req: {
        _headers: ['key1', 'key2']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _headers: ['key3', 'key2']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _res: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ],
  '/edge-cases/validation/res': [
    {
      _req: {
        _headers: ['key1', 'key2']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _headers: ['key3', 'key2']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ]
};
