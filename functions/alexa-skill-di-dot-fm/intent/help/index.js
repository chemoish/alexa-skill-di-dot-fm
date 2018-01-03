const { HelpIntent } = require('../type');
const { log } = require('../../util/log');

module.exports = {
  [HelpIntent]: [
    (req, res) => {
      log(HelpIntent);

      res
        .say('You can say "play channel Vocal Trance" or simply, "what can you do?".')
        .reprompt('What would you like to do?')
        .shouldEndSession(false)
      ;
    }
  ]
};
