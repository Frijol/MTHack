var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.process = function(req, res){
  // get text input
  var myText = req.body.inputText;
  // separate out words
  var myTextArray = myText.split(' ');
  // get mp3 of each word separately
  for (var i = 0; i < myTextArray.length; i++) {
    var myURL = 'http://tts-api.com/tts.mp3?q=' + myTextArray[i] + '&return_url=1';
    request(myURL, function (err, res, URLofMp3) {
      if (!err && res.statusCode == 200) {
        request(URLofMp3, function (err, res, mp3) {
          if (!err && res.statusCode == 200) {
            console.log(mp3);
          }
        });
      }
    });
  }
  res.redirect('/');
};
