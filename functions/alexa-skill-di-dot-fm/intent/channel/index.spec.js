const chai = require('chai');
const express = require('express');
const merge = require('lodash/merge');
const request = require('supertest');

const { ChannelIntent } = require('../type');
const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { log } = require('../../util/log');

const { expect } = chai;

describe(ChannelIntent, () => {
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

  it('Should respond to a channel intent with empty slot.', () => {
    merge(mock.request.intent, {
      slots: {
        CHANNEL: {
          name: 'CHANNEL',
          value: ''
        }
      }
    });

    return intentRequest(mock)
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        log(response.body.response, true);

        expect(ssml).to.equal("<speak>Sorry, unable to find channel . Try another channel <break time='400ms'/> Or simply say, what can you do?</speak>");
      })
    ;
  });

  it('Should respond to a channel intent with valid slot.', () => {
    merge(mock.request.intent, {
      slots: {
        CHANNEL: {
          name: 'CHANNEL',
          value: 'Vocal Trance'
        }
      }
    });

    return intentRequest(mock)
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        log(response.body.response, true);

        expect(ssml).to.equal('<speak>Playing channel, Vocal Trance.</speak>');
      })
    ;
  });

  it('Should respond to a channel intent with case insensitive slot.', () => {
    merge(mock.request.intent, {
      slots: {
        CHANNEL: {
          name: 'CHANNEL',
          value: 'vocal trance'
        }
      }
    });

    return intentRequest(mock)
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        log(response.body.response, true);

        expect(ssml).to.equal('<speak>Playing channel, Vocal Trance.</speak>');
      })
    ;
  });

  it('Should respond to a channel intent with invalid slot.', () => {
    merge(mock.request.intent, {
      slots: {
        CHANNEL: {
          name: 'CHANNEL',
          value: 'Rick Astley'
        }
      }
    });

    return intentRequest(mock)
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        log(response.body.response, true);

        expect(ssml).to.equal("<speak>Sorry, unable to find channel Rick Astley. Try another channel <break time='400ms'/> Or simply say, what can you do?</speak>");
      })
    ;
  });
});
