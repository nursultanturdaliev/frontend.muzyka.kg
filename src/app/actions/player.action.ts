import { Action } from '@ngrx/store';
import {Song} from "../Models/song";

export const PAUSE = '[PAUSE SONG] Set song';
export const PLAY = '[PLAY SONG] Set song';


export class Pause implements Action {
  type = PAUSE;
}
export class Play implements Action {
  type = PLAY;

  constructor(public payload:Song) {
  }
}

export type All = Play | Pause;
