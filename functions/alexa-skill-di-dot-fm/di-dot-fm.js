const alexa = require('alexa-app');

const { log } = require('./util/log');
const { makeAttachAudioPlayer } = require('./util/audio-player');
const { makeAttachIntent } = require('./util/intent');

const app = new alexa.app('di-dot-fm');

app.customSlot('CHANNEL', require('./data/channel'));

app.launch((req, res) => {
  log('LaunchRequest');

  res
    .say('Welcome to D I dot F M.')
    .reprompt('What would you like to do?')
    .shouldEndSession(false)
  ;
});

const attachIntent = makeAttachIntent(app);

attachIntent(require('./intent/channel'));
attachIntent(require('./intent/help'));
attachIntent(require('./intent/instruction'));
attachIntent(require('./intent/list'));
attachIntent(require('./intent/pause'));
attachIntent(require('./intent/random'));
attachIntent(require('./intent/resume'));

// attachAudioPlayer(require('./directive/playback'));

app.error = (execption, req, res) => {
  res.say("Sorry, I do not supernintendo.");
};

module.exports = app;
