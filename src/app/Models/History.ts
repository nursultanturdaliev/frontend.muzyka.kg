/**
 * Created by nursultan on 7/31/17.
 */
import {Injectable} from '@angular/core'
import {Song} from "../song";

@Injectable()
export class History {
  public id:string;
  public song:Song;
  public startedAt:any;
  public stoppedAt:any;
}
