import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../player.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {
  audio: any;
  song: any;
  promise: any;
  playing: boolean;
  paused: boolean;
  muted: boolean;
  unMuted: boolean;

  constructor(private playerService: PlayerService) {
    this.audio = new Audio();
    this.playerService.onCurrentSongChange(() => {
      this.play();
    });
  }

  ngOnInit() {
    this.playing = false;
    this.paused = true;
    this.muted = true;
    this.unMuted = false;
    this.playerService.currentTime = 0;
  }

  play() {
    this.audio.src = this.getCurrentURL();
    this.audio.play();
    this.audio.currentTime = this.playerService.currentTime;
    this.promise = new Promise((resolve, reject) => {
      this.playing = true;
      this.paused = false;
      this.audio.addEventListener('playing', () => {
        resolve(true);
      });
      this.audio.addEventListener('error', () => {
        reject(false);
      });
    });

    return this.promise;
  }

  formatTime(time) {
    if (!this.audio || !time) {
      return '00:00';
    }
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var minStr = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    var secStr = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
    return minStr + ':' + secStr;
  }

  pause(currentTime) {
    this.playerService.currentTime = currentTime;
    this.toggle();
    this.audio.pause();
  }

  next() {
    this.playerService.currentTime = 0;
    var song = this.playerService.getNextSong();
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
  }

  previous() {
    this.playerService.currentTime = 0;
    var song = this.playerService.getPreviousSong();
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
  }

  private getCurrentURL() {
    if (!this.playerService.getCurrentSong()) {
      var song = this.playerService.getSongs()[0];
      this.playerService.currentSongTitle = song.title;
      return 'http://obon.aio.kg/song/' + song.uuid + '/stream';
    }
    else
      return 'http://obon.aio.kg/song/' + this.playerService.getCurrentSong().uuid + '/stream';

  }

  private toggle() {
    this.playing = !this.playing;
    this.paused = !this.paused;
  }

  toggleMute(data) {
    this.audio.volume = data;
    this.muted = !this.muted;
    this.unMuted = !this.unMuted;
  }

  getCurrentSongTitle() {
    return this.playerService.currentSongTitle;
  }
}
