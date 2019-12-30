module.exports = db = {
  '/customers/{id}/identifier': [
    {
      _id: 'Nathan',
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    },
    {
      _id: 'mark',
      _headers: [],
      _body: {
        name: 'Mark'
      }
    }
  ],
  '/customers/{id}': [
    {
      id_: 'Nathan',
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    },
    {
      id_: 'mark',
      _headers: [],
      _body: {
        name: 'Mark'
      }
    }
  ],
  '/customers/{id}/data?name={d1}&dateOfBirth={d2}': [
    {
      _headers: [],
      _id: '123',
      _d1: 'hector',
      _d2: '10-10-200',
      _body: {
        name: 'Nathan'
      }
    },
    {
      _headers: [],
      _id: 'valueOne',
      _d1: 'valueTwo',
      _d2: 'valueThree',
      _body: {
        name: 'Nathan'
      }
    }
  ],
  '/customers/age': [
    {
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    }
  ],
  '/customers/multiple/scenarios': [
    {
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    },
    {
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    }
  ],
  '/customers/{id}/multiple/scenarios': [
    {
      _id: 'juan',
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    },
    {
      _id: 'juan',
      _headers: [],
      _body: {
        name: 'Nathan'
      }
    }
  ]
};
