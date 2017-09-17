import {Song} from "./song";
export interface Player {
  song:Song;
  songs:Song[];
  command:string;
}
