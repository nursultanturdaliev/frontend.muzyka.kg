import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Artist} from "./artist";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtistsService {

    private artistsUrl = 'http://api.aio.kg/app_dev.php/api/artist/0/100';

  constructor(private http: Http) {
  }

  getArtists(): Promise<Artist[]> {
    return this.http.get(this.artistsUrl)
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
