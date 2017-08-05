import {Injectable} from '@angular/core';
import {count} from 'rxjs/operator/count';
import {HistoryService} from "./history.service";
import {Song} from '../Models/song';


@Injectable()
export class PlayerService {
  private currentSong:Song;
  private callbacks:any;
  private songs:any;
  private index:any;
  public currentTime:any;
  public currentSongTitle:any;

  constructor(private historyService:HistoryService) {

  }

  setCurrentSong(song:Song) {
    let currentUuid = this.currentSong ? this.currentSong.uuid : null;
    let nextUuid = song.uuid;
    this.historyService.updateHistory(currentUuid, nextUuid);
    this.currentSong = song;
    this.currentSongChanged();
  }

  getCurrentSong() {
    return this.currentSong;
  }

  private currentSongChanged() {
    this.callbacks.forEach((callback) => {
      callback();
    });
  }

  play(song:Song, songs, index) {
    this.currentTime = 0;
    this.currentSongTitle = song.title;
    this.setCurrentSong(song);
    this.setSongs(songs);
    this.setIndex(index);
  }

  public onCurrentSongChange(f) {
    if (!this.callbacks) {
      this.callbacks = [];
    }
    this.callbacks.push(f);
  }

  setSongs(songs:any) {
    this.songs = songs;
  }

  setIndex(index:any) {
    this.index = index;
  }

  getNextSong(isRandom) {
    var random = 0;
    if (isRandom) {
      random = Math.floor(Math.random() * (99 - 0 + 1)) + 0;
    }

    if (this.index == this.getSongs().length - 1) {
      this.index = 0 + random;
      return this.songs[this.index];
    }
    else {
      this.index++;
      if ((this.index + random) > this.getSongs().length) {
        this.index = this.getSongs().length + this.index - random;
      } else {
        this.index = this.index + random;
      }
      return this.songs[this.index];
    }
  }

  getPreviousSong(isRandom) {
    var random = 0;
    if (isRandom) {
      random = Math.floor(Math.random() * (99 - 0 + 1)) + 0;
    }
    if (!this.index) {
      this.index = this.getSongs().length - 1;
      return this.songs[this.index];
    }
    else {
      this.index--;
      if ((this.index + random) > this.getSongs().length) {
        this.index = this.getSongs().length + this.index - random;
      } else {
        this.index = this.index + random;
      }
      return this.songs[this.index];
    }
  }

  getSongs() {
    return this.songs;
  }

  isCurrentSong(song:Song) {
    if (!this.getCurrentSong()) {
      return false;
    }
    return this.getCurrentSong().uuid == song.uuid;
  }
}
