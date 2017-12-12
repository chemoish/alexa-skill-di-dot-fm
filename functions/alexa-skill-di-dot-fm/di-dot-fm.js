const alexa = require('alexa-app');

const app = new alexa.app('di-dot-fm');

app.customSlot('CHANNEL', require('./data/channel'));

app.launch((req, res) => {
  console.log('LaunchRequest');

  res
    .say('Welcome to D I dot F M.')
    .reprompt('What would you like to do?')
    .shouldEndSession(false)
  ;
});

app.intent.apply(null, require('./intent/channel'));
app.intent.apply(null, require('./intent/help'));
app.intent.apply(null, require('./intent/instruction'));
app.intent.apply(null, require('./intent/list'));
app.intent.apply(null, require('./intent/pause'));
app.intent.apply(null, require('./intent/random'));
app.intent.apply(null, require('./intent/resume'));

app.error = (execption, req, res) => {
  res
    .say("Sorry, I do not supernintendo.")
    .reprompt('You can say "play channel Vocal Trance" or simply, "what can you do?".')
    .shouldEndSession(false)
  ;
};

module.exports = app;
