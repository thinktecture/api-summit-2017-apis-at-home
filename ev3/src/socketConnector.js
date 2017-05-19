'use strict';

const io = require('socket.io-client'),
    connectors = require('./connectors');

class SocketConnector {
    init(url) {
        this._io = io(url);

        this._io.on('connect', () => console.log('Connection established'));
    }

    _initConnectors() {
        connectors.forEach(connector => connector.init(this._io));
    }
}

module.exports = new SocketConnector();
