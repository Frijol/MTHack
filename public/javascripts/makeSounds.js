var context;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    oscillator = context.createOscillator();

    oscillator.type = 0; // sine wave
    oscillator.frequency.value = 1000;
    oscillator.connect(context.destination);
    oscillator.noteOn && oscillator.noteOn(0);
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
