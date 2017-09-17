import * as PlayerActions from '../actions/player.action';
import {Player} from '../Models/player';

export type Action = PlayerActions.All

const initialState:Player = {
  song: null,
  command: 'IDLE',
  songs:[]
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function playerReducer(state:Player = initialState, action) {
  switch (action.type) {
    case PlayerActions.PAUSE:
      return newState(state, {command: 'PAUSE'});
    case PlayerActions.PLAY:
      return newState(state, Object.assign({command: 'PLAY'},action.payload));
    default:
      return state;
  }
}
