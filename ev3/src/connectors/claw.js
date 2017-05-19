'use strict';

class ClawConnector {
    init(io) {
        io.on('claw', this._handleClaw.bind(this));
    }

    _handleClaw(message) {
        if (message === 'open') {
            this.onClawOpen();
        }

        if (message === 'close') {
            this.onClawClose();
        }
    }

    onClawOpen() {}
    onClawClose() {}
}

module.exports = new ClawConnector();
