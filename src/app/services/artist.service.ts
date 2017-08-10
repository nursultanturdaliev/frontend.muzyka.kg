import {Injectable} from '@angular/core';
import {Artist} from '../Models/artist';
import {Http} from "@angular/http";
import {ConfigService} from "./config.service";

@Injectable()
export class ArtistService {

  constructor(private http:Http, private configService:ConfigService) {
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
