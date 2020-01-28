module.exports = dbPost6 = [
  {
    _req: {
      _body: {
        data: 'data1'
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
    },
    _res: {
      _body: {
        name: 'Example_two'
      }
    }
  },
  {
    _req: {
      _body: { val: 'f' },
      _bodyPaths: [{ '$.data.name': 'superman' }]
    },
    _res: {
      _body: {
        ok: 'you found superman and marvel!'
      }
    }
  }
];
