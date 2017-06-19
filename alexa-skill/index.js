'use strict';

const Alexa = require('alexa-sdk'),
    request = require('request');

const APP_ID = process.env.APP_ID;

const languageStrings = {
    de: {
        translation: {
            SKILL_NAME: 'Lego Helferlein',
            WELCOME: '<say-as interpret-as="interjection">moin.</say-as> Benutze Sprache, um Deinen persönlichen Lego-Roboter-Assistenten zu steuern. Was möchtest Du machen?',
            CLAW_NOT_POSSIBLE: 'Leider habe ich nicht verstanden, was ich mit der Zange machen soll. Was möchtest Du machen?',
            CLAW_OPEN: '<say-as interpret-as="interjection">sesam öffne dich</say-as>',
            CLAW_VALUE_NOT_POSSIBLE: 'Die Zange kann nur geöffnet oder geschlossen werden. Was möchtest Du machen?',
            MOVE_NOT_POSSIBLE: 'Leider habe ich nicht verstanden, wie ich den Roboter bewegen soll. Was möchtest Du machen?',
            MOVE_VALUE_NOT_POSSIBLE: 'Die Bewegung kann nur vorwärts oder rückwärts sein. Was möchtest Du machen?',
            HELP_MESSAGE: 'Du kannst Befehle wie "Zange Öffnen", "Fahre Vorwärts" oder "Ich habe Durst" sagen. Wie kann ich Dir helfen?',
            HELP_REPROMPT: 'Geht nicht? Gibt\'s nicht!',
            OK: '<say-as interpret-as="interjection">voila.</say-as>',
            DO_IT_DUDE: '<prosody volume="x-loud"><say-as interpret-as="interjection">donnerwetter.</say-as></prosody> Ab geht die wilde Fahrt. <say-as interpret-as="interjection">juhu.</say-as>',
            ERROR_INVOKING_API: '<say-as interpret-as="interjection">verdammt.</say-as> Leider konnte ich die API nicht erreichen.',
            STOP_MESSAGE: '<say-as interpret-as="interjection">tschö.</say-as>'
        }
    }
};

const baseUrl = 'http://api-summit-2017-apis-at-home.azurewebsites.net/';

const clawOperationValueMap = {
    'schließen': 'close',
    'öffnen': 'open'
};

const moveOperationValueMap = {
    'vorwärts': 'forward',
    'rückwärts': 'backward'
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('WELCOME'));
    },
    'MoveIntent': function () {
        const moveOperation = this.event.request.intent.slots.MoveOperation;

        if (!moveOperation.value) {
            return this.emit(':ask', this.t('MOVE_NOT_POSSIBLE'));
        }

        const value = moveOperation.value;

        if (!moveOperationValueMap[value]) {
            return this.emit(':ask', this.t('MOVE_VALUE_NOT_POSSIBLE'));
        }

        executeApi('move/' + moveOperationValueMap[value],
            () => this.emit(':ask', this.t('OK')),
            () => this.emit(':tell', this.t('ERROR_INVOKING_API')));
    },
    'StopIntent': function () {
        executeApi('move/stop',
            () => this.emit(':ask', this.t('OK')),
            () => this.emit(':tell', this.t('ERROR_INVOKING_API')));
    },
    'DoItDudeIntent': function () {
        executeApi('doitdude',
            () => this.emit(':tell', this.t('DO_IT_DUDE')),
            () => this.emit(':tell', this.t('ERROR_INVOKING_API')));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'Unhandled': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function executeApi(api, success, error) {
    request.get(baseUrl + api, function (error, response) {
        if (response.statusCode !== 200) {
            return error();
        }

        success();
    });
}
