var Player = require('player');
var http = require('http');
var request = require('request');
var childProcess = require('child_process');

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
// player.play(function(err, player) {

// });