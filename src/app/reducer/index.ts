import {ActionReducerMap,createFeatureSelector,createSelector} from '@ngrx/store';
import * as currentSong from './currentSong.reducer';

export interface State {
  currentSong: currentSong.State;
}

export const reducers: ActionReducerMap<State> = {
  currentSong: currentSong.currentSongReducer
};

export const getCurrentSongState = createFeatureSelector<currentSong.State>('currentSong');

export const getCurrentSong = createSelector(
  getCurrentSongState,
  currentSong.getCurrentSong
);
