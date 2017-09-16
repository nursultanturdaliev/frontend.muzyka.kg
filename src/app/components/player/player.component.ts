import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Http} from '@angular/http';
import {SongService} from '../../services/song.service';
import {ConfigService} from "../../services/config.service";
import {HistoryService} from "../../services/history.service";
import {Song} from "../../Models/song";
import {AppState} from "../../app.component";
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {PlayerState} from "../../reducer/player.reducer";

@Component({
  selector: 'app-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {
  audio:any;
  song:any;
  promise:any;
  playing:boolean;
  paused:boolean;
  random:boolean;
  notRandom:boolean;
  repeat:boolean;
  notRepeat:boolean;
  muted:boolean;
  unMuted:boolean;
  currentTime:any;
  progressBar:any;
  volume:any;
  tempVolume:any;
  volumeBarWidth:any;
  progressBarWidth:any;

  currentSong:Observable<Song>;
  playerState:Observable<PlayerState>;
  duration:string;

  constructor(public playerService:PlayerService,
              private songService:SongService,
              private ref:ChangeDetectorRef,
              private configService:ConfigService,
              private store:Store<AppState>) {
    this.audio = new Audio();

    setInterval(() => {
      this.progressBar = this.formatTime(this.audio.currentTime);
      this.progressBar = this.getProgressBar();
      this.progressBarWidth = document.getElementById('progress-bar').offsetWidth;
      this.volumeBarWidth = document.getElementById('volume-bar').offsetWidth;
      this.ref.markForCheck();
    }, 1000);

    this.audio.addEventListener('ended', () => {
      this.next(this.repeat);
    });

    this.audio.addEventListener('durationchange', (event)=> {
      this.duration = this.formatTime(this.audio.duration);
    });
    this.audio.addEventListener('timeupdate',(event) => {
      this.currentTime = this.formatTime(this.audio.currentTime)
    });

    this.currentSong = store.select('currentSong');
    this.playerState = store.select('playerState');
    this.currentSong.subscribe((song:Song) => {
      this.play(song);
    });

    this.playerState.subscribe((playerState:PlayerState) => {
      this.pause();
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
    this.progressBarWidth = document.getElementById('progress-bar').offsetWidth;
    this.volumeBarWidth = document.getElementById('volume-bar').offsetWidth;
  }

  play(song:Song) {
    this.audio.src = this.getCurrentURL(song);
    this.audio.play();
    this.audio.currentTime = 0;
    document.getElementById('musicbar').className += ' animate';
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

  pause() {
    this.toggle();
    this.audio.pause();
    document.getElementById('musicbar').classList.remove('animate');
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
  }

  previous() {
    this.playerService.currentTime = 0;
    var song = this.playerService.getPreviousSong(this.random);
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
  }

  private getCurrentURL(song:Song) {
    return this.configService.API_URL + '/song/stream/' + song.uuid;
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
