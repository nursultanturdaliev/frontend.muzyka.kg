import {Injectable} from '@angular/core';
import {count} from 'rxjs/operator/count';
import {HistoryService} from "./history.service";
import {Song} from '../Models/song';
import {AppState} from "../app.component";
import {Store} from '@ngrx/store';
import * as playerActions from "../actions/player.action";
import {playerReducer} from "../reducer/player.reducer";
import  {Observable} from 'rxjs/Observable';
import {Player} from "../Models/player";
@Injectable()
export class PlayerService {
  public playerObservable:Observable<Player>;
  private songs:any;
  private index:any;
  public currentTime:any;
  public currentSongTitle:any;
  public player:Player;

  constructor(private historyService:HistoryService, private store:Store<AppState>) {
    this.playerObservable = store.select('player');
    this.playerObservable.subscribe((player:Player)=> {
      this.player = player;
    });
  }


  pause() {
    //noinspection TypeScriptValidateTypes
    this.store.dispatch({type: playerActions.PAUSE})
  }

  isCurrentSong(song:Song) {
    return this.player.command == 'PLAY' && this.player.song && this.player.song.id === song.id;
  }

  play(song:Song, songs) {
    //noinspection TypeScriptValidateTypes
    this.store.dispatch({type: playerActions.PLAY, payload: {song: song, songs: songs}});
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
