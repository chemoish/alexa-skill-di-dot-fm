const { log } = require('../../util/log');
const { PauseIntent } = require('../type');

module.exports = {
  [PauseIntent]: [
    (req, res) => {
      log(PauseIntent);

      res.audioPlayerStop();
    }
  ]
};
