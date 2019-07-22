import { Action } from '@ngrx/store';
import {Song} from "../Models/song";
import {Player} from "../Models/player";

export const PAUSE = '[PAUSE SONG]';
export const PLAY = '[PLAY SONG]';


export class Pause implements Action {
  type = PAUSE;
}
export class Play implements Action {
  type = PLAY;

  constructor(public payload:Player) {
  }
}

export type All = Play | Pause;
