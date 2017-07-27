import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from '@angular/http';
import {ConfigService} from "./services/config.service";

@Injectable()
export class SongsService {

  constructor(private http:Http, private configService:ConfigService) {
  };

  getSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/0/100')
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  incrementPlayCount(song:Song) {
    return this.http.put(this.configService.API_URL + '/song/' + song.id + '/increase_count_play', {})
      .toPromise()
      .then(response => response.json());
  }

  getRandomSongs(options):Promise<Song[]> {
    let params = new URLSearchParams();
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        params.set(key, options[key]);
      }
    }
    let requestOptions = new RequestOptions({search: params});
    return this.http.get(this.configService.API_URL + '/song/random/5', requestOptions)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  getTopSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/top/0/10')
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }


  getNewSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/status/new/50')
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

  private handleError(error:any):Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
