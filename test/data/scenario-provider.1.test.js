module.exports = db = {
  '/customers/{id}/identifier': [
    {
      _id: 'Nathan',
      _headers: [],
      description_: 'Nathan identifier',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _id: 'mark',
      _headers: [],
      description_: 'Mark identifier',
      _body: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}': [
    {
      id_: 'Nathan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      id_: 'mark',
      _headers: [],
      description_: 'Mark customers data',
      _body: {
        name: 'Mark',
      },
    },
  ],
  '/customers/{id}/data?name={d1}&dateOfBirth={d2}': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _id: '123',
      _d1: 'hector',
      _d2: '10-10-200',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _headers: [],
      description_: 'Nathan customers data',
      _id: 'valueOne',
      _d1: 'valueTwo',
      _d2: 'valueThree',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/age': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/multiple/scenarios': [
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
  '/customers/{id}/multiple/scenarios': [
    {
      _id: 'juan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
    {
      _id: 'juan',
      _headers: [],
      description_: 'Nathan customers data',
      _body: {
        name: 'Nathan',
      },
    },
  ],
};
