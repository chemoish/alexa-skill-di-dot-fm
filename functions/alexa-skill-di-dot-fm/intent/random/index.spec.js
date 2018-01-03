const chai = require('chai');
const request = require('supertest');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { log } = require('../../util/log');
const { RandomIntent } = require('../type');

const { expect } = chai;

describe(RandomIntent, () => {
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

  it('Should respond to a random intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const { ssml } = response.body.response.outputSpeech;

        log(response.body.response, true);

        expect(ssml).to.match(/<speak>(.*?)while I find a channel for you. <break time=\'1s\'\/> Ok <break time=\'500ms\'\/> playing channel, (.*?).<\/speak>/);
      })
    ;
  });
});
