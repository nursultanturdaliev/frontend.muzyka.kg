import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RandomSongsService {

    private randomSongsUrl = 'http://api.aio.kg/app_dev.php/api/song/random/12';
    private baseURL = 'http://api.aio.kg/api';

  constructor(private http: Http) {
  }

  getRandomSongs(): Promise<Song[]> {
    return this.http.get(this.randomSongsUrl)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
