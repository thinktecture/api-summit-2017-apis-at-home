'use strict';

class ClawController {
    init(restify) {
        restify.get('/claw/open', this._open.bind(this));
        restify.get('/claw/close', this._close.bind(this));
    }

    _open(req, res) {
        res.json(200, 'Claw Open');
    }

    _close(req, res) {
        res.json(200, 'Claw Close');
    }
}

module.exports = new ClawController();
