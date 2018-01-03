const AmazonSpeech = require('ssml-builder/amazon_speech');

const { log } = require('../../util/log');
const { RandomIntent } = require('../type');
const channelList = require('../../data/channel');

module.exports = {
  [RandomIntent]: [
    {
      utterances: [
        '{to|} play a random {station|channel}'
      ],
    },

    (req, res) => {
      log(RandomIntent);

      const intro = [
        'Please hold on',
        'Please wait one moment',
        'Please wait one second'
      ];

      const speech = new AmazonSpeech();

      speech
        .say(intro[Math.floor(Math.random() * intro.length)])
        .say('while I find a channel for you.')
        .pause('1s')
        .say('Ok')
        .pause('500ms')
        .say(`playing channel, ${channelList[Math.floor(Math.random() * channelList.length)]}.`)
      ;

      res.say(speech.ssml());
    }
  ]
};
