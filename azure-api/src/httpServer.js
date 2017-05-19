'use strict';

const restify = require('restify'),
    controllers = require('./controllers/index');

class HttpServer {
    init(port) {
        this._restify = restify.createServer();

        this._initControllers();

        this._restify.listen(port, () => console.log('Up & running'));
    }

    _initControllers() {
        controllers.forEach(controller => controller.init(this._restify));
    }
}

module.exports = new HttpServer();
