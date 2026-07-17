/* Audio Manager Module - Museum of Us */
/* All synthesized sounds DISABLED - only Spotify music player is used */

let audioCtx = null;
let bgmAudio = null;

function initCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export const AudioManager = {
  init: function () {
    initCtx();
  },

  // BGM removed - using Spotify player in Navbar instead
  playBGM: function () {},
  pauseBGM: function () {},
  toggleBGM: function () {},
  isPlaying: function () { return false; },

  // All sound effects disabled
  playClick: function () {},
  playStamp: function () {},
  playCamera: function () {},
  startProjectorHum: function () {},
  stopProjectorHum: function () {},
  playDoorCreak: function () {}
};
