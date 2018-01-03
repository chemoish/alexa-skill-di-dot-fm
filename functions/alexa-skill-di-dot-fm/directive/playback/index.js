const { log } = require('../../util/log');

modules.export = {
  ['Play']: [
    (req, res) => {
      log('Play');

      res.say('Play');
    }
  ],

  ['Stop']: [
    (req, res) => {
      log('Stop');

      res.say('Stop');
    }
  ]
};
