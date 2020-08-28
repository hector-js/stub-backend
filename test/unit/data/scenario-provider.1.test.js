module.exports = db = {
  '/customers/{id}/identifier': [
    {
      _req: {
        _id: 'Nathan',
        _headers: []

      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    },
    {
      _req: {
        _id: 'mark',
        _headers: []
      },
      _res: {
        _body: {
          name: 'Mark'
        }
      }
    }
  ],
  '/customers/{id}': [
    {
      _req: {
        id_: 'Nathan',
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    },
    {
      _req: {
        id_: 'mark',
        _headers: []
      },
      _res: {
        _body: {
          name: 'Mark'
        }
      }
    }
  ],
  '/customers/{id}/data?name={d1}&dateOfBirth={d2}': [
    {
      _req: {
        _headers: [],
        _id: '123',
        _d1: 'hector',
        _d2: '10-10-200'
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    },
    {
      _req: {
        _headers: [],
        _id: 'valueOne',
        _d1: 'valueTwo',
        _d2: 'valueThree'
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    }
  ],
  '/customers/age': [
    {
      _req: {
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    }
  ],
  '/customers/multiple/scenarios': [
    {
      _req: {
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    },
    {
      _req: {
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    }
  ],
  '/customers/{id}/multiple/scenarios': [
    {
      _req: {
        _id: 'juan',
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    },
    {
      _req: {
        _id: 'juan',
        _headers: []
      },
      _res: {
        _body: {
          name: 'Nathan'
        }
      }
    }
  ],
  '/two/same/request': [
    {
      _id: '1',
      _req: {

      },
      _res: {
        _body: {
          scenario: 1
        }
      }
    },
    {
      _id: '2',
      _req: {

      },
      _res: {
        _body: {
          scenario: 2
        }
      }
    }
  ]
};
