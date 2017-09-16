import {Injectable} from '@angular/core';
import {count} from 'rxjs/operator/count';
import {HistoryService} from "./history.service";
import {Song} from '../Models/song';
import {AppState} from "../app.component";
import {Store} from '@ngrx/store';
import * as songActions from "../actions/currentSong.action";
import * as playerActions from "../actions/player.action";
import {getCurrentSong} from "../reducer/index";
import  {Observable} from 'rxjs/Observable';
@Injectable()
export class PlayerService {
  public currentSong:Observable<Song>;
  private songs:any;
  private index:any;
  public currentTime:any;
  public currentSongTitle:any;
  public song:Song;
  constructor(private historyService:HistoryService, private store:Store<AppState>) {
    this.currentSong = store.select('currentSong');
    this.currentSong.subscribe((song:Song)=> {
      this.song = song;
    });
  }

  setCurrentSong(song:Song) {
    //noinspection TypeScriptValidateTypes
    this.store.dispatch({type: songActions.SET_CURRENT_SONG, payload: song})
  }

  pause(){
    //noinspection TypeScriptValidateTypes
    this.store.dispatch({type:playerActions.PAUSE})
  }

  isCurrentSong(song:Song) {
    return this.song && this.song.id === song.id;
  }

  play(song:Song, songs, index) {
    this.currentTime = 0;
    this.currentSongTitle = song.title;
    this.setCurrentSong(song);
    this.setSongs(songs);
    this.setIndex(index);
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
}
