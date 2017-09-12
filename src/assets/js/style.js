/**
 * Created by nomad on 9/11/17.
 */
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady(youtubeId) {
    player = new YT.Player('ytplayer', {
        videoId: youtubeId
    });
}
onYouTubePlayerAPIReady();