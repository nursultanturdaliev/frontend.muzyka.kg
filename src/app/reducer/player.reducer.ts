import * as playerActions from '../actions/player.action';

export interface PlayerState {
  status:string;
}

const initialState:PlayerState = {
  status: null
};
export function playerReducer(state:PlayerState = initialState, action) {
  switch (action.type) {
    case playerActions.PAUSE:
      return {status: 'PAUSED'};
    case playerActions.PLAY:
      return {status: 'PLAYING'};
    default:
      return state;
  }
}
