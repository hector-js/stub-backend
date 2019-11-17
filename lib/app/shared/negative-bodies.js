module.exports = {
  multipleScenarios: {
    errorCode: 500,
    message: 'Multiple scenarios were found :(',
  },
  notFound: {
    errorCode: 404,
    message: 'Scenario not found in the resources! :(',
  },
  unauhtorized: {
    errorCode: 401,
    message: 'Header not found! :(',
  },
  badSource: {
    errorCode: 400,
    message: 'Incorrect db json format under resources :(',
  },
  cookieHeader: {
    errorCode: 401,
    message: 'Cookie and header not found in the request! :(',
  },
  cookieNotFound: {
    errorCode: 401,
    message: 'Cookie not found in the request! :(',
  },
};
