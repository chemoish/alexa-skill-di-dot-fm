const { ResumeIntent } = require('../type');

module.exports = [
  ResumeIntent,

  (req, res) => {
    console.log(ResumeIntent);

    res.say('Resume Intent.');
  }
];
