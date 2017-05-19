'use strict';

const httpServer = require('./httpServer');

httpServer.init(process.env.PORT || 8080);
