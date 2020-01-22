module.exports = dbPost = [
  {
    _req: {
      _id: 'juan',
      _headers: [],
      _body: {
        data: 'data1'
      }
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
  },
  {
    _req: {
      _id: 'juan',
      _headers: [],
      _body: {
        data: 'data6'
      }
    },
    _res: {
      _body: {
        name: 'first'
      }
    }
  },
  {
    _req: {
      _id: 'juan',
      _headers: [],
      _body: {
        data: 'data6'
      }
    },
    _res: {
      _body: {
        name: 'second'
      }
    }
  },
  {
    _req: {
      _id: 'juan',
      _headers: [],
      _body: {
        data1: 'data1',
        data2: 'data2',
        data3: {
          data4: 'data4',
          data5: 'data5'
        }
      },
      _excludeBodyFields: ['$.data1', '$.data3.data4']
    },
    _res: {
      _body: {
        name: 'second'
      }
    }
  }
];
