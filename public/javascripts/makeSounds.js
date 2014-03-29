$('#submitButton').click(function(){
  $.post('/process', {inputText: $('#inputText')[0].value}, function (res) {
    for (var i = 0; i < res.length; i++) {
      mp3 = decode(res[i]);
      parseAudio(mp3);
    }
  });
});

var decode = function(base64) {
  var bufferLength = base64.length * 0.75,
  len = base64.length, i, p = 0,
  encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }

  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

  var arraybuffer = new ArrayBuffer(bufferLength),
  bytes = new Uint8Array(arraybuffer);

  for (i = 0; i < len; i+=4) {
    encoded1 = chars.indexOf(base64[i]);
    encoded2 = chars.indexOf(base64[i+1]);
    encoded3 = chars.indexOf(base64[i+2]);
    encoded4 = chars.indexOf(base64[i+3]);

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return arraybuffer;
};

var parseAudio = function (mp3) {
  var context;
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    context.decodeAudioData(mp3, function (buffer) {
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.noteOn(0);
      source.start(0);
    });


    // var playNote = function(whichNote, duration) {
    //   // whichNote = # notes above major tone
    //   detuneVal = whichNote * 150;
    //   setTimeout(function() {
    //     oscillator.detune.value = detuneVal;
    //   }, duration);
    // }
    //
    //
    // // Fix up for prefixing
    // window.AudioContext = window.AudioContext||window.webkitAudioContext;
    // context = new AudioContext();
    // oscillator = context.createOscillator();
    //
    // oscillator.type = 0; // sine wave
    // oscillator.frequency.value = 500;
    // oscillator.connect(context.destination);
    // oscillator.noteOn && oscillator.noteOn(0);
    //
    // setTimeout(function () {
    //   oscillator.detune.value = 150;
    // }, 2000);

  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
