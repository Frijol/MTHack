// takes a string myText, callback operates on array of 1 mp3 per word
var processInput = function (myText, callback) {
  // predef buffer for mp3 files
  var buff = [];
  // separate out words
  var myTextArray = myText.split(' ');
  // get mp3 of each word separately
  // for (var i = 0; i < myTextArray.length; i++) {
  //   var myURL = 'http://tts-api.com/tts.mp3?q=' + myTextArray[i] + '&return_url=1';
  //   request(myURL, function (err, res, URLofMp3) {
  //     if (!err && res.statusCode == 200) {
  //       request(URLofMp3, function (err, res, mp3) {
  //         if (!err && res.statusCode == 200) {
  //           buff.push(mp3)
  //         }
  //       });
  //     }
  //   });
  // }
  // // wait for buffer to fill
  // var waitLoop = setInterval(function wait () {
  //   if (buff.length == myTextArray.length) {
  //     clearInterval(waitLoop);
  //     console.log('Buffering complete.');
  //     callback && callback(buff);
  //   } else {
  //     console.log('Buffering...');
  //   }
  // }, 100);
}

$('#submitButton').click(function(){
  console.log($('#inputText')[0].value)
})

var context;
window.addEventListener('load', init, false);
function init() {
  try {
    var dogBarkingBuffer = null;
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    // loadSound('http://media.tts-api.com/2aae6c35c94fcfb415dbe95f408b9ce91ee846ed.mp3')
    //
    // function loadSound(url) {
    //   var request = createCORSRequest('GET', url);
    //   // request.open('GET', url, true);
    //   // request.responseType = 'arraybuffer';
    //
    //   // Decode asynchronously
    //   request.onload = function() {
    //     context.decodeAudioData(request.response, function(buffer) {
    //       dogBarkingBuffer = buffer;
    //     }, onError);
    //   }
    //   request.send();
    // }
    //
    // function createCORSRequest(method, url) {
    //   var xhr = new XMLHttpRequest();
    //   if ("withCredentials" in xhr) {
    //     console.log('withcreds')
    //     // Check if the XMLHttpRequest object has a "withCredentials" property.
    //     // "withCredentials" only exists on XMLHTTPRequest2 objects.
    //     xhr.open(method, url, true);
    //
    //   } else if (typeof XDomainRequest != "undefined") {
    //
    //     // Otherwise, check if XDomainRequest.
    //     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    //     xhr = new XDomainRequest();
    //     xhr.open(method, url);
    //
    //   } else {
    //
    //     // Otherwise, CORS is not supported by the browser.
    //     xhr = null;
    //
    //   }
    //   return xhr;
    // }

    var playNote = function(whichNote, duration) {
      // whichNote = # notes above major tone
      detuneVal = whichNote * 150;
      setTimeout(function() {
        oscillator.detune.value = detuneVal;
      }, duration);
    }


    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    oscillator = context.createOscillator();

    oscillator.type = 0; // sine wave
    oscillator.frequency.value = 500;
    oscillator.connect(context.destination);
    oscillator.noteOn && oscillator.noteOn(0);

    setTimeout(function () {
      oscillator.detune.value = 150;
    }, 2000);

  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
