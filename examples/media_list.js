var vlc = require('../vlc')([
  //'-I', 'dummy',
  //'-V', 'dummy',
  //'-vvvv', 'dummy',
  //'--verbose', '1',
  //'--no-video-title-show',
  //'--no-disable-screensaver',
  //'--no-snapshot-preview'
]);


var util = require('util');

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
player.play();

setTimeout(function(){
  //player.next();
},3000);

var poller = setInterval(function () {
  
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