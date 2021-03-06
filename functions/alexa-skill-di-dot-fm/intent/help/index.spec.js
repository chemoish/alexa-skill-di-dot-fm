const chai = require('chai');
const express = require('express');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { HelpIntent } = require('../type');
const { log } = require('../../util/log');

const { expect } = chai;

describe(HelpIntent, () => {
  let intentRequest;
  let mock;
  let server;

  beforeEach(() => {
    server = createServerFromIntent(require('./index'));

    intentRequest = makeIntentRequestFromServer(server);

    mock = require('./index.mock');
  });

  afterEach(() => {
    server.close();
  });

  it('Should respond to a help intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const {
          outputSpeech,
          reprompt,
          shouldEndSession
        } = response.body.response;

        log(response.body.response, true);

        expect(outputSpeech.ssml).to.equal('<speak>You can say "play channel Vocal Trance" or simply, "what can you do?".</speak>');
        expect(reprompt.outputSpeech.ssml).to.equal('<speak>What would you like to do?</speak>');
        expect(shouldEndSession).to.be.false;
      })
    ;
  });
});
