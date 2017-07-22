import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';
import {ConfigService} from "./services/config.service";

@Injectable()
export class RandomSongsService {

  constructor(private http:Http, private configService:ConfigService) {
  }

  getRandomSongs():Promise<Song[]> {
    return this.http.get(this.configService.API_URL + '/song/random/10')
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  private handleError(error:any):Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
