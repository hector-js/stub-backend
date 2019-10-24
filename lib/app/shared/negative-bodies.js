module.exports = {
    notFound: {
        errorCode: 404,
        message: 'Scenario not found in db.json! :('
    },
    unauhtorized: {
        errorCode: 401,
        message: 'Header not found! :('
    },
    badSource: {
        errorCode: 400,
        message: 'Incorrect db json format under resources :('
    },
    cookieHeader: {
        errorCode: 401,
        message: 'Cookie and header not found in the request! :('
    },
    cookieNotFound:{
        errorCode: 401,
        message: 'Cookie not found in the request! :('
    }
};
