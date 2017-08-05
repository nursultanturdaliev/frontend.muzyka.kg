import {Injectable} from '@angular/core';
import {Artist} from "./artist";
import {Http} from "@angular/http";
import {ConfigService} from "./services/config.service";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class ArtistService {

  constructor(private http:AuthHttp, private configService:ConfigService) {
  }

  getArtists(page:number):Promise<Artist[]> {
    return this.http.get(this.configService.API_URL + '/artist/page/' + page)
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError);
  }

  getArtist(artistId):Promise<Artist> {
    return this.http.get(this.configService.API_URL + '/artist/' + artistId)
      .toPromise()
      .then(response => response.json() as Artist)
      .catch(this.handleError)
  }

  random(limit:number):Promise<Artist[]> {
    return this.http.get(this.configService.API_URL + '/artist/random/' + limit)
      .toPromise()
      .then(response => response.json() as Artist[])
      .catch(this.handleError)
  }

  private handleError(error:any):Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
