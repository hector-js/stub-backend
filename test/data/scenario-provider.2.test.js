module.exports = dbPost = [
  {
    _id: 'juan',
    _headers: [],
    _requestBody: {
      data: 'data1'
    },
    _body: {
      name: 'Nathan'
    }
  },
  {
    _id: 'juan',
    _headers: [],
    _requestBody: {
      data: 'data2'
    },
    _body: {
      name: 'Nathan'
    }
  },
  {
    _id: 'juan',
    _headers: [],
    _requestBody: {
      data: 'data6'
    },
    _body: {
      name: 'first'
    }
  },
  {
    _id: 'juan',
    _headers: [],
    _requestBody: {
      data: 'data6'
    },
    _body: {
      name: 'second'
    }
  },
  {
    _id: 'juan',
    _headers: [],
    _requestBody: {
      data1: 'data1',
      data2: 'data2',
      data3: {
        data4: 'data4',
        data5: 'data5'
      }
    },
    _excludeBodyFields: ['$.data1', '$.data3.data4'],
    _body: {
      name: 'second'
    }
  }
];
