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
  currentSong:any;
  playing:boolean;
  paused:boolean;
  random:boolean;
  repeat:boolean;
  muted:boolean;
  currentTime:any;
  pausedTime:any;
  progressBar:any;
  volume:any;
  tempVolume:any;
  volumeBarWidth:any;
  progressBarWidth:any;

  playerObservable:Observable<Player>;
  player:Player;
  duration:string;

  iOSAudioSrc:any;

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
      this.next();
    });

    this.audio.addEventListener('durationchange', (event)=> {
      this.duration = this.formatTime(this.audio.duration);
    });
    this.audio.addEventListener('timeupdate', (event) => {
      this.currentTime = this.formatTime(this.audio.currentTime);
    });

    this.playerObservable = store.select('player');
    this.playerObservable.subscribe((player:Player) => {
      this.player = player;
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

    if (!song) {
      return;
    }

    if(this.currentSong != song){
      this.currentSong = song;
      this.pausedTime = 0;
    }

    if (this.isIOS()) {
      this.audio = <HTMLMediaElement>document.getElementById("audio");
      this.iOSAudioSrc = <HTMLMediaElement>document.getElementById("audio-src");
      this.iOSAudioSrc.src = this.getCurrentURL(this.currentSong);
      this.audio.load();

    } else {
      this.audio.src = this.getCurrentURL(this.currentSong);
    }
    this.audio.play();
    this.audio.currentTime = this.pausedTime;
    this.playing = true;
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
    this.pausedTime = this.audio.currentTime;
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

  next() {
    let song = null;
    if (this.repeat) {
      song = this.player.song;
    } else if (this.random) {
      song = this.getRandomSong();
    } else {
      song = this.getNextSong();
    }
    this.playerService.play(song,this.player.songs);
  }

  getRandomSong() {
    let songs = this.player.songs;
    let randomIndex = Math.floor(songs.length * Math.random());
    return songs[randomIndex];
  }

  getNextSong() {
    let songs = this.player.songs;
    let song = this.player.song;
    let newIndex = 0;
    for (let index = 0; index < songs.length; index++) {
      if (song.id == songs[index].id) {
        newIndex = (index + 1) % songs.length;
        break;
      }
    }
    return songs[newIndex];
  }

  previous() {
    let song = null;
    if (this.repeat) {
      song = this.player.song;
    } else if (this.random) {
      song = this.getRandomSong();
    } else {
      song = this.getPreviousSong();
    }
    this.playerService.play(song,this.player.songs);
  }

  getPreviousSong() {
    let songs = this.player.songs;
    let song = this.player.song;
    let newIndex = 0;
    for (let index = 0; index < songs.length; index++) {
      if (song.id == songs[index].id) {
        if (index === 0) {
          index = songs.length;
        }
        newIndex = (index -1) % songs.length;
        break;
      }
    }
    return songs[newIndex];
  }

  private getCurrentURL(song:Song) {
    return this.configService.API_URL + '/song/stream/' + song.uuid;
  }

  setRepeat(repeat:boolean) {
    this.repeat = repeat;
  }

  setRandom(random:boolean) {
    this.random = random;
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

  public isIOS(){
    return parseFloat(
      ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false;
  }
}
