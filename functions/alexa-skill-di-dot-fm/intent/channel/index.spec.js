const express = require('express');
const request = require('supertest');
const chai = require('chai');

const { ChannelIntent } = require('../type');
const { createServerFromIntent } = require('../../test/utility');

const { expect } = chai;

describe(ChannelIntent, () => {
  let server;

  beforeEach(() => {
    server = createServerFromIntent(require('./index'));
  });

  afterEach(() => {
    server.close();
  });

  it('Should respond to a channel intent with empty slot.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: ChannelIntent,
            slots: {
              CHANNEL: {
                name: 'CHANNEL',
                value: ''
              }
            }
          }
        }
      })
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        expect(ssml).to.equal("<speak>Sorry, unable to find channel . Try another channel <break time='400ms'/> Or simply say, what can you do?</speak>");
      })
    ;
  });

  it('Should respond to a channel intent with valid slot.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: ChannelIntent,
            slots: {
              CHANNEL: {
                name: 'CHANNEL',
                value: 'Vocal Trance'
              }
            }
          }
        }
      })
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        expect(ssml).to.equal('<speak>Playing channel, Vocal Trance.</speak>');
      })
    ;
  });

  it('Should respond to a channel intent with case insensitive slot.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: ChannelIntent,
            slots: {
              CHANNEL: {
                name: 'CHANNEL',
                value: 'vocal trance'
              }
            }
          }
        }
      })
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        expect(ssml).to.equal('<speak>Playing channel, Vocal Trance.</speak>');
      })
    ;
  });

  it('Should respond to a channel intent with invalid slot.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: ChannelIntent,
            slots: {
              CHANNEL: {
                name: 'CHANNEL',
                value: 'Rick Astley'
              }
            }
          }
        }
      })
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        expect(ssml).to.equal("<speak>Sorry, unable to find channel Rick Astley. Try another channel <break time='400ms'/> Or simply say, what can you do?</speak>");
      })
    ;
  });
});
