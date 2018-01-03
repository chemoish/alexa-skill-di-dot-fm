const chai = require('chai');
const express = require('express');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { PauseIntent } = require('../type');
const { log } = require('../../util/log');

const { expect } = chai;

describe(PauseIntent, () => {
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

  it('Should respond to a pause intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const {
          directives,
          shouldEndSession
        } = response.body.response;

        log(response.body.response, true);

        expect(directives[0].type).to.equal('AudioPlayer.Stop');
        expect(shouldEndSession).to.be.true;
      })
    ;
  });
});
