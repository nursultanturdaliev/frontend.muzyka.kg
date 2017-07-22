import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';
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

  private handleError(error:any):Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }

  incrementPlayCount(song:Song) {
    return this.http.put(this.configService.API_URL + '/song/' + song.id + '/increase_count_play', {})
      .toPromise()
      .then(response => response.json());
  }
}
