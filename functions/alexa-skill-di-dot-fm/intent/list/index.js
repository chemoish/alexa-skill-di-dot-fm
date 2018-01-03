const { ListIntent } = require('../type');
const { log } = require('../../util/log');

module.exports = {
  [ListIntent]: [
    (req, res) => {
      log(ListIntent);

      res.say('List Intent.');
    }
  ]
};
