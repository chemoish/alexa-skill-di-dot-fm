const chai = require('chai');
const request = require('supertest');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { InstructionIntent } = require('../type');
const { log } = require('../../util/log');

const { expect } = chai;

describe(InstructionIntent, () => {
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

  it('Should respond to a instruction intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const {
          outputSpeech,
          reprompt,
          shouldEndSession
        } = response.body.response;

        log(response.body.response, true);

        expect(outputSpeech.ssml).to.equal('<speak>I can "play a channel by name", "play a random channel", or "list the available channels."</speak>');
        expect(reprompt.outputSpeech.ssml).to.equal('<speak>What would you like to do?</speak>');
        expect(shouldEndSession).to.be.false;
      })
    ;
  });
});
