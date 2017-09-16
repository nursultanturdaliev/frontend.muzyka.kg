import {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';
import * as currentSong from './currentSong.reducer';
import * as playerR from './player.reducer';

export interface State {
  currentSong: currentSong.State;
  playerState: playerR.PlayerState
}

export const reducers: ActionReducerMap<State> = {
  currentSong: currentSong.currentSongReducer,
  playerState:playerR.playerReducer
};

export const getCurrentSongState = createFeatureSelector<currentSong.State>('currentSong');

export const getCurrentSong = createSelector(
  getCurrentSongState,
  currentSong.getCurrentSong
);
