import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewSongsService {

    private newSongsUrl = 'http://api.aio.kg/app_dev.php/api/song/newreleases/8';
    private baseURL = 'http://api.aio.kg/api';

  constructor(private http: Http) {
  }

  getNewSongs(): Promise<Song[]> {
    return this.http.get(this.newSongsUrl)
      .toPromise()
      .then(response => response.json() as Song[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
