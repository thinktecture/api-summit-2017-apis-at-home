'use strict';

const socketConnector = require('./socketConnector');

let url = 'http://localhost:8080';

if (process.env.NODE_ENV === 'production') {
    url = 'https://api-summit-2017-apis-at-home.azurewebsites.net';
}

socketConnector.init(url);
