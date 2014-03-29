var context;
window.addEventListener('load', init, false);
function init() {
  try {
    var dogBarkingBuffer = null;
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    loadSound('http://media.tts-api.com/2aae6c35c94fcfb415dbe95f408b9ce91ee846ed.mp3')

    function loadSound(url) {
      var request = createCORSRequest('GET', url);
      // request.open('GET', url, true);
      // request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
          dogBarkingBuffer = buffer;
        }, onError);
      }
      request.send();
    }

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        console.log('withcreds')
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

      } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

      } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

      }
      return xhr;
    }


    // // Fix up for prefixing
    // window.AudioContext = window.AudioContext||window.webkitAudioContext;
    // context = new AudioContext();
    // oscillator = context.createOscillator();
    //
    // oscillator.type = 0; // sine wave
    // oscillator.frequency.value = 1000;
    // oscillator.connect(context.destination);
    // oscillator.noteOn && oscillator.noteOn(0);
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}
