module.exports = dbPost7 = {
  '/edge-cases/filterByHeader': [
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
          name: 'Example_two'
        }
      }
    },
    {
      _req: {
        _headers: ['key4']
      },
      _res: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ],
  '/edge-cases/filterByHeader/array': [
    {
      _req: {
        _headers: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _headers: {
          key3: 'value3',
          key2: 'value2'
        }
      },
      _res: {
        _body: {
          name: 'Example_two'
        }
      }
    },
    {
      _req: {
        _headers: {
          key4: 'value4'
        }
      },
      _res: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ],
  '/edge-cases/filterByCookies': [
    {
      _req: {
        _cookies: ['key1', 'key2']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _cookies: ['he']
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _cookies: ['key3', 'key2']
      },
      _res: {
        _body: {
          name: 'Example_two'
        }
      }
    },
    {
      _req: {
        _cookies: ['key4']
      },
      _res: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ],
  '/edge-cases/filterByCookies/array': [
    {
      _req: {
        _cookies: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      _res: {
        _body: {
          name: 'other'
        }
      }
    },
    {
      _req: {
        _cookies: {
          key3: 'value3',
          key2: 'value2'
        }
      },
      _res: {
        _body: {
          name: 'Example_two'
        }
      }
    },
    {
      _req: {
        _cookies: {
          key4: 'value4'
        }
      },
      _res: {
        _body: {
          ok: 'you found superman and marvel!'
        }
      }
    }
  ]
};
