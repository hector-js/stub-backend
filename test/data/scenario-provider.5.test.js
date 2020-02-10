module.exports = dbPost5 = [
  {
    _req: {
      _body: {
        data: 'data1'
      }
    },
    _res: {
      _body: {
        name: 'Example_one'
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
      _bodyPaths: { '$.data.name': 'superman' }
    },
    _res: {
      _body: {
        ok: 'you found superman and marvel!'
      }
    }
  }
];
