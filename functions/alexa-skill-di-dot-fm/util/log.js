const isObjectLike = require('lodash/isObjectLike');

module.exports = {
  log(message, debug = false) {
    if (
      // skip if NODE_ENV is not test and debug is true
      (process.env.NODE_ENV !== 'test' && debug === true) ||

      // skip if NODE_ENV is test and debug is false
      (process.env.NODE_ENV === 'test' && debug === false) ||

      // skip if NODE_ENV is test and DEBUG is false
      (process.env.NODE_ENV === 'test' && !process.env.DEBUG)
    ) {
      return;
    }

    if (!isObjectLike(message)) {
      console.log(`Message: ${message}`)
    } else {
      console.log(`\n${JSON.stringify(message, ' ', 2)}\n`);
    }
  }
};
