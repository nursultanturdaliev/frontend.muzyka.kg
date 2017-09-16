import { Action } from '@ngrx/store';

export const PAUSE = '[PAUSE SONG] Set song';
export const PLAY = '[PAUSE SONG] Set song';


export class Pause implements Action {
  type = PAUSE;
}
export class Play implements Action {
  type = PLAY;
}

export type Actions = Play | Pause;
