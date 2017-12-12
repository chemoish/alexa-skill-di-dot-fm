const { ListIntent } = require('../type');

module.exports = [
  ListIntent,

  (req, res) => {
    console.log(ListIntent);

    res.say('List Intent.');
  }
];
