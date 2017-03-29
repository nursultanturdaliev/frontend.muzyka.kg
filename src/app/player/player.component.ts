import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../player.service';
import {Songs} from '../songs';
import {min} from "rxjs/operator/min";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})

export class PlayerComponent implements OnInit {
  audio: any;
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
  }

  play() {
    this.audio.src = this.getCurrentURL();
    if (!this.audio) {
      alert('ok');
    }
    this.audio.play();
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

  pause() {
    this.toggle();
    this.audio.pause();
  }

  next() {
    this.playerService.setCurrentSong(this.playerService.getNextSong());
  }

  previous() {
    this.playerService.setCurrentSong(this.playerService.getPreviousSong());
  }

  private getCurrentURL() {
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

}
