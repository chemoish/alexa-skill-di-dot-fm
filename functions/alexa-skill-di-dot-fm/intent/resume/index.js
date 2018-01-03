const { log } = require('../../util/log');
const { ResumeIntent } = require('../type');

module.exports = {
  [ResumeIntent]: [
    (req, res) => {
      log(ResumeIntent);

      res.audioPlayerPlayStream('REPLACE_ALL', {
        offsetInMilliseconds: 0,
        token: req.context.AudioPlayer.token,
        url: req.context.AudioPlayer.token
      });
    }
  ]
};
