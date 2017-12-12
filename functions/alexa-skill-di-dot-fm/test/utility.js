const express = require('express');

module.exports = {
  createServerFromIntent(intent) {
    const app = express();

    const alexa = require('alexa-app');

    const skill = new alexa.app('di-dot-fm');

    skill.intent.apply(null, intent);

    skill.express({
      checkCert: false,
      debug: true,
      expressApp: app,
    });

    return app.listen(3000);
  }
};
