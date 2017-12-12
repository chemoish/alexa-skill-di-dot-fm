const { PauseIntent } = require('../type');

module.exports = [
  PauseIntent,

  (req, res) => {
    console.log(PauseIntent);

    res.say('Pause Intent.');
  }
];
