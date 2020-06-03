module.exports = {
  env: 'development',
  port: 3005,
  pathDb: {
    to: '/_hjs/resources',
    from: '/@hectorjs/stub-backend/lib/app/shared/read-db-files',
    abs: '../../../../_hjs/resources',
    fromRetry: '/_hjs'
  }
};
