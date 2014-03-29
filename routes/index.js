var request = require('request');
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.process = function(req, res){
  var buff = [];
  // get text input
  var myText = req.body.inputText;
  // separate out words
  var myTextArray = myText.split(' ');
  // get mp3 of each word separately
  for (var i = 0; i < myTextArray.length; i++) {
    var myURL = 'http://tts-api.com/tts.mp3?q=' + myTextArray[i] + '&return_url=1';
    request(myURL, function (err, res, URLofMp3) {
      if (!err && res.statusCode == 200) {
        request({url: URLofMp3, encoding:null}, function (err, res, mp3) {
          if (!err && res.statusCode == 200) {
            buff.push(mp3.toString('base64'));
          }
        });
      }
    });
  }
  // wait for buffer to fill
  var waitLoop = setInterval(function wait () {
    if (buff && buff.length == myTextArray.length) {
      clearInterval(waitLoop);
      console.log('Buffering complete.');
      res.send(buff);
    } else {
      console.log('Buffering...');
    }
  }, 100);
};
