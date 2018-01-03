module.exports = {
  makeAttachAudioPlayer(app) {
    return function attachAudioPlayer(event) {
      for (const e in event) {
        app.audioPlayer(e, ...event[e]);
      }
    };
  }
};
