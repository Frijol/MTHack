/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var Player = require('player');
var http = require('http');
var request = require('request');
var childProcess = require('child_process');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/process', routes.process);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var echonestKey = 'RVTUTVWZ94RJVH5CT'; 

var player = new Player('./assets/Thunder_Clatter.mp3');

var wordsToSay = ["1", "2", "3", "4", "tell", "me", "that", "you", "love", "me", "more"];
var word = 0;

fetchSong('Wild Cub', 'Thunder Clatter', function(err, song) {
  findSongAttributes(song, function(err, attributes) {
    var wpm = attributes.tempo/60/2;
    console.log(wpm);
    console.log("Got these attributes", attributes);
    player.play();
    setInterval(function() {
      childProcess.exec('echo "' + wordsToSay[word++] + '" | say');
      if (word == wordsToSay.length) {
        word = 0;
      }
    }, wpm * 1000)
  });
});


function fetchSong(artist, title, callback) {

  var requestString = 'http://developer.echonest.com/api/v4/song/search?api_key=' + echonestKey + '&artist=' + artist + '&title=' +title;
  request(requestString, function(err, response, body) {
    if (err) {
      return findSongAttributes(err);
    }
    else {
      var nestResp = JSON.parse(body);
      if (nestResp.response.status.code == 0) {
        callback(null, nestResp.response.songs[0]);
      }
      else {
        callback && callback(nestResp.response.status.code)
      }
    }
  });
}

function findSongAttributes(songJSON, callback) {
  var songRequest = 'http://developer.echonest.com/api/v4/song/profile?api_key=' + echonestKey + '&id=' + songJSON.id + '&bucket=audio_summary';

  request(songRequest, function(err, response, body) {
    if (err) {
      return callback && callback(err);
    }
    else {
      var nestResp = JSON.parse(body);
      console.log(body);
      console.log(nestResp);
      if (nestResp.response.status.code == 0) {
        return callback && callback(null, nestResp.response.songs[0].audio_summary);
      }
      else {
        return callback && callback(nestResp.response.status.code);
      }
    }
  });
}
