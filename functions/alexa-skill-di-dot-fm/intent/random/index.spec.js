const chai = require('chai');
const request = require('supertest');

const { createServerFromIntent } = require('../../test/utility');
const { RandomIntent } = require('../type');

const { expect } = chai;

describe(RandomIntent, () => {
  let server;

  beforeEach(() => {
    server = createServerFromIntent(require('./index'));
  });

  afterEach(() => {
    server.close();
  });

  it('Should respond to a random intent.', () => {
    return request(server)
      .post('/di-dot-fm')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: RandomIntent
          }
        }
      })
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        expect(ssml).to.match(/<speak>(.*?)while I find a channel for you. <break time=\'1s\'\/> Ok <break time=\'500ms\'\/> playing channel, (.*?).<\/speak>/);
      })
    ;
  });
});
