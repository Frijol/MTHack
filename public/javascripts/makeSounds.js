$('#submitButton').click(function(){
  $.post('/process', {inputText: $('#inputText')[0].value}, function (res) {
    var times = [1];
    var totaltime = 0;
    for (var i = 1; i < res.length; i++) {
      times.push(times[i-1] + getRandomInt(1, 2));
      totaltime += times[i];
    }
    var count = 0;
    setInterval (function (){
      for (var i = 0; i < res.length; i++) {
        mp3 = decode(res[i]);
        parseAudio(mp3, count * totaltime + times[i]);
      };
      count += 1;
    }, totaltime * 1000);
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var parseAudio = function (mp3, when) {
  try {
    context.decodeAudioData(mp3, function (buffer) {
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      console.log("Telling it to start!", when);
      source.start(when);
    });


  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

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
