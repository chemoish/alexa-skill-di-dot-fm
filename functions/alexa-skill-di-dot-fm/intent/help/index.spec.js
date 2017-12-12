const express = require('express');
const request = require('supertest');
const chai = require('chai');

const { createServerFromIntent } = require('../../test/utility');
const { HelpIntent } = require('../type');

const { expect } = chai;

describe(HelpIntent, () => {
  let server;

  beforeEach(() => {
    server = createServerFromIntent(require('./index'));
  });

  afterEach(() => {
    server.close();
  });

  it('Should respond to a help intent.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: HelpIntent
          }
        }
      })
      .expect(200).then((response) => {
        const {
          outputSpeech,
          reprompt,
          shouldEndSession
        } = response.body.response;

        expect(outputSpeech.ssml).to.equal('<speak>You can say "play channel Vocal Trance" or simply, "what can you do?".</speak>');
        expect(reprompt.outputSpeech.ssml).to.equal('<speak>What would you like to do?</speak>');
        expect(shouldEndSession).to.be.false;
      })
    ;
  });
});
