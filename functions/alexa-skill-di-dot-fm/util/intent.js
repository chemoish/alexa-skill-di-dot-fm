module.exports = {
  makeAttachIntent(app) {
    return function attachIntent(intent) {
      for (const i in intent) {
        app.intent(i, ...intent[i]);
      }
    };
  }
};
