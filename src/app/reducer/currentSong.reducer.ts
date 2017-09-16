/**
 * Created by nursultan on 9/16/17.
 */
import {Song} from "../Models/song";
import * as songActions from '../actions/currentSong.action';

export interface State {
  currentSong:Song;
}

const initialState:State = {
  currentSong:null
};


export function currentSongReducer(state = initialState, action) {
  switch (action.type) {
    case songActions.GET_CURRENT_SONG:
      return state;
    case songActions.SET_CURRENT_SONG:
      return action.payload;
    default:
          return state;
  }
}

export const getCurrentSong = (state:State) => state.currentSong;
