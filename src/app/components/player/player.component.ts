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
import {Player} from "../../Models/player";

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
  repeat:boolean;
  muted:boolean;
  currentTime:any;
  progressBar:any;
  volume:any;
  tempVolume:any;
  volumeBarWidth:any;
  progressBarWidth:any;

  player:Observable<Player>;
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
    this.audio.addEventListener('timeupdate', (event) => {
      this.currentTime = this.formatTime(this.audio.currentTime)
    });

    this.player = store.select('player');
    this.player.subscribe((player:Player) => {
      console.log(player);
      switch (player.command) {
        case 'PAUSE':
          this.pause();
          return;
        case 'PLAY':
          this.play(player.song);
          return;
      }
    });
  }

  ngOnInit() {
    this.playing = false;
    this.paused = true;
    this.muted = false;
    this.random = false;
    this.repeat = false;
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
    this.playing = false;
    this.paused = true;
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
    this.playerService.play(song);
  }

  private getCurrentURL(song:Song) {
    return this.configService.API_URL + '/song/stream/' + song.uuid;
  }

  shuffle() {
    this.random = true;
  }

  toggleMute() {
    if (!this.muted) {
      this.audio.volume = 0;
      this.tempVolume = this.volume;
      this.volume = Math.round(this.audio.volume * 100);
    } else {
      this.volume = this.tempVolume;
      this.audio.volume = Math.round(this.volume / 100);
    }
    this.muted = !this.muted;
  }
}
