import {Injectable} from '@angular/core';
import {Song} from './song';


@Injectable()
export class PlayerService {
  private currentSong: Song;
  private callbacks: any;
  private songs: any;
  private index: any;
  public currentTime: any;
  public currentSongTitle: any;

  setCurrentSong(song: Song) {
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

  getSongs() {
    return this.songs;
  }

  setCurrentTime(number: number) {
    this.currentTime = number;
  }
  getCurrentTime(): any {
    return this.currentTime;
  }
}
