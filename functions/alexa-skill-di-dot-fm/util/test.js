const express = require('express');
const request = require('supertest');

const { makeAttachIntent } = require('../util/intent');

module.exports = {
  createServerFromIntent(intent) {
    const expressApp = express();

    const alexa = require('alexa-app');

    const app = new alexa.app('di-dot-fm');

    const attachIntent = makeAttachIntent(app);

    attachIntent(intent);

    app.express({
      expressApp,
      checkCert: false,
      debug: true,
    });

    return expressApp.listen(3000);
  },

  makeIntentRequestFromServer(server) {
    return function intentRequest(payload) {
      return request(server)
        .post('/di-dot-fm')
        .send(payload)
      ;
    };
  }
};
