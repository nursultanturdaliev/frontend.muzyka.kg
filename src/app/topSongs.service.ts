import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopSongsService {

    private topSongsUrl = 'http://obon.aio.kg/app_dev.php/api/song/top/60';
    private baseURL = 'http://obon.aio.kg/api';

  constructor(private http: Http) {
  }

  getTopSongs(): Promise<Song[]> {
    return this.http.get(this.topSongsUrl)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
