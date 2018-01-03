const chai = require('chai');
const express = require('express');

const { createServerFromIntent, makeIntentRequestFromServer } = require('../../util/test');
const { log } = require('../../util/log');
const { ResumeIntent } = require('../type');

const { expect } = chai;

describe(ResumeIntent, () => {
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

  it('Should respond to a resume intent.', () => {
    return intentRequest(mock)
      .expect(200).then((response) => {
        const {
          directives,
          outputSpeech,
        } = response.body.response;

        log(response.body.response, true);

        expect(directives[0].audioItem.stream.offsetInMilliseconds).to.equal(0);
        expect(directives[0].audioItem.stream.token).to.equal('music.mp3');
        expect(directives[0].audioItem.stream.url).to.equal('music.mp3');
        expect(directives[0].playBehavior).to.equal('REPLACE_ALL');
      })
    ;
  });
});
