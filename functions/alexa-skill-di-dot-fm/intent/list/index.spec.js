const chai = require('chai');
const express = require('express');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { ListIntent } = require('../type');
const { log } = require('../../util/log');

const { expect } = chai;

describe(ListIntent, () => {
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

  it('Should respond to a list intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const {
          outputSpeech,
          reprompt,
          shouldEndSession
        } = response.body.response;

        log(response.body.response, true);

        expect(outputSpeech.ssml).to.equal('<speak>List Intent.</speak>');
      })
    ;
  });
});
