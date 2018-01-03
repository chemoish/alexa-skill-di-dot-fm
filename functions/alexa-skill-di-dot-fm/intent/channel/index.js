const AmazonSpeech = require('ssml-builder/amazon_speech');

const { ChannelIntent } = require('../type');
const { log } = require('../../util/log');
const channelList = require('../../data/channel');

module.exports = {
  [ChannelIntent]: [
    {
      slots: {
        CHANNEL: 'CHANNEL'
      },
      utterances: [
        '{to|} play {station|channel|} {-|CHANNEL}'
      ],
    },

    (req, res) => {
      log(ChannelIntent);

      const slot = req.slot('CHANNEL');

      const channel = channelList.find((channel) => channel.name.toLowerCase() === slot.toLowerCase());

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

      const stream = `https://rocky-coast-74584.herokuapp.com/${channel.id}_hi?code=4fa197a742c8340b`;

      res
        .say(`Playing channel, ${channel.name}.`)
        .audioPlayerPlayStream('REPLACE_ALL', {
          offsetInMilliseconds: 0,
          token: stream,
          url: stream
        })
      ;
    }
  ]
};
