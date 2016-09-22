var vlc = require('../vlc')([
  //'-I', 'dummy',
  //'-V', 'dummy',
  //'-vvvv', 'dummy',
  //'--verbose', '1',
  //'--no-video-title-show',
  //'--no-disable-screensaver',
  //'--no-snapshot-preview'
]);

var Media = require('../lib/media');

var util = require('util');
//https://mailman.videolan.org/pipermail/vlc-commits/2016-April/035004.html
var list = vlc.mediaList();
var media = vlc.mediaFromFile('/home/mc007/Music/Sasha/HeyNow.mp3');
//var media2 = vlc.mediaFromFile('/install/emergency005.mp3');
var media2 = vlc.mediaFromUrl('http://techslides.com/demos/sample-videos/small.mp4');

list.add(media);
list.add(media2);
console.error('count',list.count());
//util.inspect(list);
//list.release();

var player = vlc.mediaListPlayer;
player.list = list;

//player.on('Stopped',function(e){});
//player.on('Paused',function(e){console.log('paused',e);});
//player.on('Playing',function(e){console.log('on playing ',e);});
//player.on('EndReached',function(e){console.log('EndReached',e);});
player.on('MediaListPlayerStopped',function(e){
  console.log('Stopped',e);
});

/*
player.on('MediaListPlayerNextItemSet',function(e){
  console.log('forward',e);
});
*/


player.on('MediaListPlayerPlayed',function(e){
  console.log('play');
});



player.on('MediaListPlayerNextItemSet',function(e){
  console.log('Next');
});

/*
player.on('PositionChanged',function(e){
  console.log('Next');
});
*/


player.play();

//var _player = player.getPlayer();

var _m = list.at(0);
console.error('media ', _m.path);
//console.dir(_m);

/*
setTimeout(function(){
  player.pause();
  setTimeout(function(){
    player.next();
  },2000);
},8000);
*/

var poller = setInterval(function () {

  console.log(_m.position());
  return;
  try {
    if (player.video.track_count > 0) {
      player.video.take_snapshot(0, "test.png", player.video.width, player.video.height);
    }
  } catch (e) {
    console.log(e);
  }
  finally {
    player.stop();

    media.release();
    vlc.release();

    clearInterval(poller);
  }
}, 3500);