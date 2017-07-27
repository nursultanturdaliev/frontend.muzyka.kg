import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Artist} from "./artist";
import 'rxjs/add/operator/toPromise';
import {ConfigService} from "./services/config.service";

@Injectable()
export class ArtistsService {

  constructor(private http: Http, private configService:ConfigService) {
  }

  getArtists(page:number): Promise<Artist[]> {
    return this.http.get(this.configService.API_URL + '/artist/page/' + page )
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
