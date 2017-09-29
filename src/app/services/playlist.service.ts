import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ConfigService} from "./config.service";
import {Playlist} from "../Models/playlist";
import {BaseService} from "./BaseService";
@Injectable()
export class PlaylistService extends BaseService {
  constructor(private http:Http, private configService:ConfigService) {
    super()
  }

  public getPlaylists(page:number):Promise<Playlist[]> {
    return this.http.get(this.configService.API_URL + '/playlist/page/' + page)
      .toPromise()
      .then(response => response.json() as Playlist[])
      .catch(this.handleError)
  }

  public getPlaylist(id:number):Promise<Playlist> {
    return this.http.get(this.configService.API_URL + '/playlist/' + id)
      .toPromise()
      .then(response => response.json() as Playlist)
      .catch(this.handleError);
  }
}
