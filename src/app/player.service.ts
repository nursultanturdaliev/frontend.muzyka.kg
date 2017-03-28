import {Injectable} from '@angular/core';
import {Songs} from './songs';


@Injectable()
export class PlayerService {
  private currentSong: Songs;
  private callbacks: any;
  private songs: any;
  private index: any;

  setCurrentSong(song: Songs) {
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

  public onCurrentSongChange(f) {
    if (!this.callbacks) {
      this.callbacks = [];
    }
    this.callbacks.push(f);
  }

  setSongs(songs: any) {
    this.songs = songs;
  }

  setIndex(index: any) {
    this.index = index;
  }

  getNextSong() {
    this.index++;
    return this.songs[this.index];
  }

  getPreviousSong() {
    this.index--;
    return this.songs[this.index];
  }
}
