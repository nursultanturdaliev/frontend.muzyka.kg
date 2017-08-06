import {Artist} from './artist';
export class Song {
  public id:number;
  public title:string;
  public uuid:string;
  public lyrics:string;
  public duration:string;
  public artist_as_one:string;
  public artists:Artist[];
}
