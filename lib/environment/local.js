module.exports = {
  env: 'local',
  port: 3006,
  pathDb: {
    to: '/_hjs/resources',
    from: '/@hectorjs/stub-backend/lib/app/shared/read-db-files',
    abs: '../../../../_hjs/resources'
  }
};
