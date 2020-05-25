module.exports = {
  env: 'test',
  port: 3004,
  pathDb: {
    to: '/test/e2e/resources',
    from: '/app/shared/read-db-files',
    fromRetry: '/test/e2e/resources',
    abs: '../test/e2e/resources'
  }
};
