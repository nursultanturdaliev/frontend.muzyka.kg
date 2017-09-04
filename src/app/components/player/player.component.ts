import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Http} from '@angular/http';
import {SongService} from '../../services/song.service';
import {ConfigService} from "../../services/config.service";
import {HistoryService} from "../../services/history.service";


@Component({
  selector: 'app-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {
  audio: any;
  song: any;
  promise: any;
  playing: boolean;
  paused: boolean;
  random: boolean;
  notRandom: boolean;
  repeat: boolean;
  notRepeat: boolean;
  muted: boolean;
  unMuted: boolean;
  currentTime: any;
  progressBar: any;
  volume: any;
  tempVolume: any;
  volumeBarWidth: any;
  progressBarWidth: any;

  constructor(public playerService: PlayerService,
              private songService: SongService,
              private ref: ChangeDetectorRef,
              private configService: ConfigService) {
    this.audio = new Audio();
    this.playerService.onCurrentSongChange(() => {
      this.play();
    });
    setInterval(() => {
      this.currentTime = this.formatTime(this.audio.currentTime);
      this.progressBar = this.formatTime(this.audio.currentTime);
      this.progressBar = this.getProgressBar();
      this.progressBarWidth = document.getElementById('progress-bar').offsetWidth;
      this.volumeBarWidth = document.getElementById('volume-bar').offsetWidth;
      this.ref.markForCheck();
    }, 1000);

    this.audio.addEventListener('ended', () => {
      this.next(this.repeat);
    });
  }

  ngOnInit() {
    this.playing = false;
    this.paused = true;
    this.muted = true;
    this.unMuted = false;
    this.random = false;
    this.notRandom = true;
    this.repeat = false;
    this.notRepeat = true;
    this.progressBar = 0;
    this.volume = 90;
    this.playerService.currentTime = '00:00';
    this.currentTime = this.playerService.currentTime;
    this.progressBarWidth = document.getElementById('progress-bar').offsetWidth;
    this.volumeBarWidth = document.getElementById('volume-bar').offsetWidth;
  }

  play() {
    this.audio.src = this.getCurrentURL();
    this.audio.play();
    this.audio.currentTime = this.playerService.currentTime;
    this.promise = new Promise((resolve, reject) => {
      this.playing = true;
      this.paused = false;
      this.currentTime = this.formatTime(this.playerService.currentTime);
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

  getProgressBar() {
    var currentPosition = this.audio.currentTime * 100 / this.audio.duration;
    return currentPosition;
  }

  pause(currentTime) {
    this.playerService.currentTime = currentTime;
    this.toggle();
    this.audio.pause();
  }

  changeCurrentTime(event) {
    var currentTime = this.audio.duration * event.offsetX / this.progressBarWidth;
    this.audio.currentTime = ~~currentTime;
  }

  changeVolume(event) {
    this.audio.volume = event.offsetX / this.volumeBarWidth;
    this.volume = this.audio.volume * 100;
  }

  next(isRepeat) {
    this.playerService.currentTime = 0;
    var song = null;
    if (isRepeat) {
      song = this.playerService.getCurrentSong();
    } else {
      song = this.playerService.getNextSong(this.random);
    }
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
  }

  previous() {
    this.playerService.currentTime = 0;
    var song = this.playerService.getPreviousSong(this.random);
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
  }

  private getCurrentURL() {
    if (!this.playerService.getCurrentSong()) {
      var song = this.playerService.getSongs()[0];
      this.playerService.setCurrentSong(song);
      this.playerService.currentSongTitle = song.title;
      return this.configService.API_URL + '/song/stream/' + song.uuid;
    }
    else
      return this.configService.API_URL + '/song/stream/' + this.playerService.getCurrentSong().uuid;

  }

  private toggle() {
    this.playing = !this.playing;
    this.paused = !this.paused;
  }

  shuffle() {
    this.random = !this.random;
    this.notRandom = !this.notRandom;
  }

  toggleMute() {
    if (this.muted) {
      this.audio.volume = 0;
      this.tempVolume = this.volume;
      this.volume = this.audio.volume * 100;
    } else {
      this.volume = this.tempVolume;
      this.audio.volume = this.volume / 100;
    }
    this.muted = !this.muted;
    this.unMuted = !this.unMuted;
  }

  repeatOrNot() {
    this.repeat = !this.repeat;
    this.notRepeat = !this.notRepeat;
  }

  getCurrentSongTitle() {
    return this.playerService.currentSongTitle;
  }

  getCurrentSongUuid() {
    return this.playerService.currentSongTitle;
  }
}
