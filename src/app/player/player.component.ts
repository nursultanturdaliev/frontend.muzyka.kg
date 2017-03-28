import {Component, OnInit} from '@angular/core';
import {PlayerService} from'../player.service';

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

  constructor(private playerService: PlayerService) {
    this.audio = new Audio();
    this.playerService.onCurrentSongChange(() => {
      this.play();
    });
  }

  ngOnInit() {
    this.playing = false;
    this.paused = true;
  }

  play() {
    this.toggle();
    this.audio.src = this.getCurrentURL();
    this.audio.play();
    this.promise = new Promise((resolve, reject) => {
      this.audio.addEventListener('playing', () => {
        resolve(true);
      });

      this.audio.addEventListener('error', () => {
        reject(false);
      });
    });

    return this.promise;
  }

  pause() {
    this.audio.pause();
    this.toggle();
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
}
