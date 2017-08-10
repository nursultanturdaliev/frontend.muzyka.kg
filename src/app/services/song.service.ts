import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from '@angular/http';
import {ConfigService} from "./config.service";
import {BaseService} from "./BaseService";
import {Song} from '../Models/song';

@Injectable()
export class SongService extends BaseService {

  constructor(private http:Http, private configService:ConfigService) {
    super();
  };

  getSongs(page:number):Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/page/' + page)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  getRandomSongs(options):Promise<Song[]> {
    let params = new URLSearchParams();
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        params.set(key, options[key]);
      }
    }
    let requestOptions = new RequestOptions({search: params});
    return this.http.get(this.configService.API_URL + '/song/random/20', requestOptions)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  getTopSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/top/1')
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }


  getNewSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/status/new')
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  search(text:string):Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/search/' + text)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

}
