import { Action } from '@ngrx/store';

export const GET_CURRENT_SONG = '[CURRENT SONG] Get song';
export const SET_CURRENT_SONG = '[CURRENT SONG] Set song';
export class GetSong implements Action {
  type = GET_CURRENT_SONG;
}

export class SetSong implements Action {
  type = SET_CURRENT_SONG;
}

export type Actions = GetSong | SetSong;
