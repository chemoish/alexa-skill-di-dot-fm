const AmazonSpeech = require('ssml-builder/amazon_speech');

const { ChannelIntent } = require('../type');
const channelList = require('../../data/channel');

module.exports = [
  ChannelIntent,

  {
    slots: {
      CHANNEL: 'CHANNEL'
    },
    utterances: [
      '{to|} play {station|channel|} {-|CHANNEL}'
    ],
  },

  (req, res) => {
    console.log(ChannelIntent);

    const slot = req.slot('CHANNEL');

    const channel = channelList.find((channel) => channel.toLowerCase() === slot.toLowerCase());

    if (!channel) {
      const speech = new AmazonSpeech();

      speech
        .say(`Sorry, unable to find channel ${slot}.`)
        .say('Try another channel')
        .pause('400ms')
        .say('Or simply say, what can you do?')
      ;

      return res
        .say(speech.ssml())
        .shouldEndSession(false)
      ;
    }

    res.say(`Playing channel, ${channel}.`);
  }
];
