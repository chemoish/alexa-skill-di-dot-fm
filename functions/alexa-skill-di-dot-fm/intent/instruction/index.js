const { InstructionIntent } = require('../type');

module.exports = [
  InstructionIntent,

  {
    utterances: [
      'give me {instructions|intents|options|services}',
      'list {instructions|intents|options|services}',
      'what {can|do} you {do|provide}',
      'what {instructions|intents|options|services} are available',
      'what {instructions|intents|options|services} do you {have|provide}',
      'what is available'
    ]
  },

  (req, res) => {
    console.log(InstructionIntent);

    res
      .say('I can "play a channel by name", "play a random channel", or "list the available channels."')
      .reprompt('What would you like to do?')
      .shouldEndSession(false)
    ;
  }
];
